import { MinHeap } from '../structure/heap';
import { compareFunction } from '../utils';

// average:O(nlgn)  worst:O(n^s) 1<s<2
/* tslint:disable: no-bitwise */
export function heap<T>(raw: T[], compare: compareFunction<T>): T[] {
    const h = new MinHeap(compare);
    const result: T[] = [];
    h.heapify(raw.slice());
    while (h.size > 0) {
        result.push(h.extract() as T);
    }
    return result;
}
