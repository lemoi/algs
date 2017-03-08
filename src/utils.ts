export type compareFunction<T> = (a: T, b: T ) => number;

export function swap<T>(arr: T[], i: number, j: number) {
    const tmp: T = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
