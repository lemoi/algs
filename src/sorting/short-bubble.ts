import { comparator } from './comparator';
// O(n^2)
export function shortBubble<T>(raw: T[], compare: comparator<T>, cover?: boolean): T[] {
    const dest = cover ? raw : raw.slice();
    const bound = raw.length - 1;
    for (let i = 0; i < bound; i++) {
        const current = dest[i];
        const next = dest[i + 1];
        if (compare(current, next) > 0) {
            dest[i] = next;
            dest[i + 1] = current;
            i = -1;
        }
    }
    return dest;
}
