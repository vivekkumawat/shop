import * as bcrypt from 'bcrypt';

export async function encrypt(string: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(string, saltOrRounds);
}

export async function decrypt(
  string: string,
  compareWithString: string,
): Promise<boolean> {
  return await bcrypt.compare(string, compareWithString);
}
