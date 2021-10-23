export function getRandomPassword() {
    // Generate random password of length 8
    return Math.random().toString(36).toUpperCase().substr(2, 8);
}
