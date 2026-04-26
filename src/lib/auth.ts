import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = 'secret-key-for-patient-portal-dev';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function loginUser(payload: any) {
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ ...payload, expires });
  
  (await cookies()).set('session', session, { expires, httpOnly: true, path: '/' });
}

export async function logoutUser() {
  (await cookies()).set('session', '', { expires: new Date(0), path: '/' });
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
