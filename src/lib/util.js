export function compareArrays(a1, a2) {
    return a1.length === a2.length && a1.every((value, index) => value === a2[index]);
}