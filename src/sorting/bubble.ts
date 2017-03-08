import { compareFunction } from '../utils';
// O(n^2)
export function bubble<T>(raw: T[], compare: compareFunction<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    const bound = raw.length - 1;
    let edge = bound;
    for (let i = 0; i < bound; i++) {
        let current = dest[0];
        let next: T;
        let tmp = 0;
        for (let j = 0; j < edge; j++) {
            next = dest[j + 1];
            if (compare(current, next) > 0) {
                dest[j + 1] = current;
                dest[j] = next;
                tmp = j;
            } else {
                current = next;
            }
        }
        edge = tmp;
    }
    return dest;
}
