/**
 * Вычисляет классы для элементов
 * @param classes - массив классов
 */
export const calculateClass = (classes: (string | undefined)[]): string => {
    return classes.filter((el) => Boolean(el)).join(' ')
}
