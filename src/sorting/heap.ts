import { MinHeap } from '../structure/heap';
import { compareFunction } from '../utils';

// O(nlgn)
export function heap<T>(raw: T[], compare: compareFunction<T>): T[] {
    const h = new MinHeap(compare);
    const dest: T[] = [];
    h.heapify(raw.slice());
    while (h.size() > 0) {
        dest.push(h.pop() as T);
    }
    return dest;
}
