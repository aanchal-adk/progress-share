import jwt from 'jsonwebtoken';
require('dotenv').config();

export function getJwt (payload: { [key: string]: any; }): string {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  return token;
}

export function verifyJwt (token: string): { [key: string]: any; } | string {
  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string);

  return decodedPayload;
}
