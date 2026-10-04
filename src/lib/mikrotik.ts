import http from 'http';
import https from 'https';

export interface MikrotikConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  useSsl: boolean;
}

export async function mikrotikRequest(config: MikrotikConfig, path: string, method: string = 'GET', body?: any) {
  return new Promise((resolve, reject) => {
    const protocol = config.useSsl ? https : http;
    // Trim credentials to avoid whitespace issues
    const username = config.username.trim();
    const password = config.password.trim();
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    
    const options: any = {
      hostname: config.host.trim(),
      port: config.port,
      path: `/rest${path}`,
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Connection': 'close',
        'User-Agent': 'BeeRadius/1.0',
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
            } catch (_e) {
              resolve(responseBody);
            }
          }
        } else {
          console.error(`[Mikrotik] Error Response (${res.statusCode}): ${responseBody}`);
          reject(new Error(`Mikrotik API error: ${res.statusCode} ${res.statusMessage} - ${responseBody}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error(`[Mikrotik] Network Error: ${e.message}`);
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

export async function getWireguardInterfaces(config: MikrotikConfig) {
  return mikrotikRequest(config, "/interface/wireguard") as Promise<any[]>;
}

export async function getWireguardPeers(config: MikrotikConfig) {
  return mikrotikRequest(config, "/interface/wireguard/peers?.proplist=.id,interface,public-key,endpoint-address,endpoint-port,allowed-address,comment,client-address,client-keepalive") as Promise<any[]>;
}
