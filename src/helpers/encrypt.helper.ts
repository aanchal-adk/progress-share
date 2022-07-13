import bcrypt from 'bcryptjs';

export async function getHashForText (text: string): Promise<string> {
    const hash = await bcrypt.hash(text, 12);

    return hash;
}
