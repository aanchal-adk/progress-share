import bcrypt from 'bcryptjs';

export async function getHashForText (text: string): Promise<string> {
    const hash = await bcrypt.hash(text, 12);

    return hash;
}

export async function comparePlainAndHash (plainText: string, hash: string): Promise<boolean> {
    const doesMatch = await bcrypt.compare(plainText, hash);

    return doesMatch;
}