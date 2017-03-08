import { compareFunction } from '../utils';
// original
/*
function select<T>(raw: T[], compare: comparator<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    const len = raw.length;
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (compare(dest[min], dest[j]) > 0) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = dest[i];
            dest[i] = dest[min];
            dest[min] = tmp;
        }
    }
    return dest;
}
*/

// improved O(n^2)
export function selection<T>(raw: T[], compare: compareFunction<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    let bound = raw.length - 1;
    for (let i = 0; i < bound; i++) {
        let min = i;
        let max = i;
        for (let j = i + 1; j <= bound; j++) {
            if (compare(dest[j], dest[min]) < 0) {
                min = j;
            } else if (compare(dest[j], dest[max]) > 0) {
                max = j;
            }
        }
        const tmp = dest[i];
        if (min !== i) {
            dest[i] = dest[min];
            dest[min] = tmp;
        }
        if (max === i) {
            max = min;
        }
        if (max !== bound) {
            dest[bound] = dest[max];
            dest[max] = tmp;
            bound--;
        }
    }
    return dest;
}
