import { comparator } from './comparator';
// average:O(nlgn)  worst:O(n^s) 1<s<2
/* tslint:disable: no-bitwise */
export function shell<T>(raw: T[], compare: comparator<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    const len = dest.length;
    let gap = len >> 1;
    while (gap > 0) {
        for (let i = gap; i < len; i += gap) {
            const key = dest[gap];
            let j = i - gap;
            while (j >= 0 && compare(dest[j], key) > 0) {
                dest[j + gap] = dest[j];
                j -= gap;
            }
            dest[j + gap] = key;
        }
        gap >>= 1;
    }
    return dest;
}
