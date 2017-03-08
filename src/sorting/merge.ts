import { compareFunction } from '../utils';

function merge<T>(a: T[], b: T[], compare: compareFunction<T>): T[] {
    let i = 0;
    let j = 0;
    const result: T[] = [];
    while (i < a.length && j < b.length) {
        result.push(compare(a[i], b[j]) < 0 ? a[i++] : b[j++]);
    }
    return result.concat(i < a.length ? a.slice(i) : b.slice(j));
}

// O(nlgn)
function mergeSort<T>(raw: T[], compare: compareFunction<T>): T[] {
    function sort(arr: T[]): T[] {
        if (arr.length <= 1) {
            return arr;
        }
        /* tslint:disable:no-bitwise */
        const mid = arr.length >> 1;
        return merge(sort(arr.slice(0, mid)), sort(arr.slice(mid)), compare);
    }
    return sort(raw);
}

export { mergeSort as merge };
