import bcrypt from "bcrypt";

const saltRounds = 12; // higher = more secure but slower

export async function hashPassword(plainPassword: string): Promise<string> {
	const hash = await bcrypt.hash(plainPassword, saltRounds);
	return hash;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
	return await bcrypt.compare(plainPassword, hashedPassword);
}
