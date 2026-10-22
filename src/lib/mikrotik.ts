import http from 'http';
import https from 'https';
import crypto from 'crypto';

export interface MikrotikConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  useSsl: boolean;
}

export function generateWireguardKeys() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('x25519');
  const privRaw = privateKey.export({ format: 'der', type: 'pkcs8' }).subarray(16);
  const pubRaw = publicKey.export({ format: 'der', type: 'spki' }).subarray(12);

  return {
    privateKey: privRaw.toString('base64'),
    publicKey: pubRaw.toString('base64'),
  };
}

export async function mikrotikRequest(config: MikrotikConfig, path: string, method: string = 'GET', body?: any) {
  return new Promise((resolve, reject) => {
    const protocol = config.useSsl ? https : http;
    // Trim credentials to avoid whitespace issues
    const username = config.username.trim();
    const password = config.password.trim();
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const payload = body ? JSON.stringify(body) : null;
    
    const options: any = {
      hostname: config.host.trim(),
      port: config.port,
      path: `/rest${path}`,
      method,
      timeout: 5000,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Connection': 'close',
        'User-Agent': 'BeeRadius/1.0',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
      rejectUnauthorized: false,
    };

    console.log(`[Mikrotik] ${method} ${options.hostname}:${options.port}${options.path}`);

    const req = protocol.request(options, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          if (method === 'DELETE' || res.statusCode === 204 || !responseBody) {
            resolve(null);
          } else {
            try {
              resolve(JSON.parse(responseBody));
            } catch {
              resolve(responseBody);
            }
          }
        } else {
          console.error(`[Mikrotik] Error Response (${res.statusCode}): ${responseBody}`);
          reject(new Error(`Mikrotik API error: ${res.statusCode} ${res.statusMessage} - ${responseBody}`));
        }
      });
    });

    req.on('timeout', () => {
      req.destroy(new Error(`Koneksi MikroTik ke ${options.hostname}:${options.port} timeout (5000ms)`));
    });

    req.on('error', (e) => {
      console.error(`[Mikrotik] Network Error: ${e.message}`);
      reject(e);
    });

    if (payload) {
      req.write(payload);
    }
    
    req.end();
  });
}

export async function getWireguardInterfaces(config: MikrotikConfig) {
  return mikrotikRequest(config, "/interface/wireguard") as Promise<any[]>;
}

export async function getWireguardPeers(config: MikrotikConfig) {
  return mikrotikRequest(config, "/interface/wireguard/peers?.proplist=.id,interface,public-key,endpoint-address,endpoint-port,allowed-address,comment,client-address,client-keepalive,last-handshake,rx,tx") as Promise<any[]>;
}

/**
 * Parsing durasi RouterOS (misal: "15s", "2m30s", "1h5m", "2d4h") menjadi total detik.
 * Mengembalikan null jika format tidak valid atau kosong.
 */
export function parseMikrotikDuration(durationStr?: string | null): number | null {
  if (!durationStr || typeof durationStr !== "string") return null;
  const str = durationStr.trim();
  if (!str) return null;

  let totalSeconds = 0;
  let matched = false;

  const dayMatch = str.match(/(\d+)d/);
  const hourMatch = str.match(/(\d+)h/);
  const minMatch = str.match(/(\d+)m(?!s)/);
  const secMatch = str.match(/(\d+)s/);
  const msMatch = str.match(/(\d+)ms/);

  if (dayMatch) { totalSeconds += parseInt(dayMatch[1], 10) * 86400; matched = true; }
  if (hourMatch) { totalSeconds += parseInt(hourMatch[1], 10) * 3600; matched = true; }
  if (minMatch) { totalSeconds += parseInt(minMatch[1], 10) * 60; matched = true; }
  if (secMatch) { totalSeconds += parseInt(secMatch[1], 10); matched = true; }
  if (msMatch && totalSeconds === 0) { totalSeconds = 1; matched = true; }

  // Jika berupa integer murni dalam detik
  if (!matched && /^\d+$/.test(str)) {
    return parseInt(str, 10);
  }

  return matched ? totalSeconds : null;
}
