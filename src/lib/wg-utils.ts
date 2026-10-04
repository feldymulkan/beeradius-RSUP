import nacl from 'tweetnacl';

export function generateWireguardKeys() {
  const keyPair = nacl.box.keyPair();
  const privateKey = Buffer.from(keyPair.secretKey).toString('base64');
  const publicKey = Buffer.from(keyPair.publicKey).toString('base64');
  
  return { privateKey, publicKey };
}

export function generatePresharedKey() {
  return Buffer.from(nacl.randomBytes(32)).toString('base64');
}
