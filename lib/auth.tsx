import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function comparePasswords(
  password: string,
  confirmedPassword: string
) {
  const isValid = password === confirmedPassword;
  return isValid;
}

export function isAlphanumeric(str: string) {
  return /^[a-zA-Z0-9]+$/.test(str);
}
