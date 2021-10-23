export function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}

export function getTimeStamp(time: Date): string {
    const timestamp = time.toISOString();
    const parts = timestamp.split('T');
    const parts2 = parts[1].split('.');
    return `${parts[0]} ${parts2[0]}`;
}