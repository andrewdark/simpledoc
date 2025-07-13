export function parseStringToNumberOrDefaultZero(str: string | undefined): number {
    if (str === undefined) {
        return 0;
    }
    const num = +str; // Попытка преобразования с помощью унарного плюса
    if (isNaN(num)) {
        return 0;
    }
    return num;
}
