import { comparator } from './comparator';

// O(nlgn)
export function quick<T>(raw: T[], compare: comparator<T>, cover?: boolean): T[] {

    const dest = cover ? raw : raw.slice();

    function sort(left: number, right: number): void {
        if (left < right) {
            let low = left;
            let high = right;
            const key = dest[left];
            out:
            while (low !== high) {
                while (compare(dest[high], key) >= 0) {
                    high--;
                    if (low === high) {
                        break out;
                    }
                }
                dest[low++] = dest[high];
                if (low === high) {
                    break;
                }
                while (compare(dest[low], key) <= 0) {
                    low++;
                    if (low === high) {
                        break out;
                    }
                }
                dest[high--] = dest[low];
            }
            dest[low] = key;
            sort(left, low - 1);
            sort(low + 1, right);
        }
    }

    sort(0, dest.length - 1);
    return dest;
}
