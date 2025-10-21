import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET || 'dev_secret');

export async function signClaims(sub: string, appId: string, claimTypes: string[]) {
  return await new SignJWT({ sub, appId, claims: claimTypes })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as { sub: string; appId: string; claims: string[]; iat: number; exp: number };
}
