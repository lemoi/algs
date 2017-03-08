import { compareFunction } from '../utils';
// O(n^2)
export function insertion<T>(raw: T[], compare: compareFunction<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    for (let i = 1; i < dest.length; i++) {
        const key = dest[i];
        let j = i;
        while (--j >= 0 && compare(dest[j], key) > 0) {
            dest[j + 1] = dest[j];
        }
        dest[j + 1] = key;
    }
    return dest;
}
