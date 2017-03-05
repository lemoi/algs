"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function merge(a, b, compare) {
    var i = 0;
    var j = 0;
    var result = [];
    while (i < a.length && j < b.length) {
        result.push(compare(a[i], b[j]) < 0 ? a[i++] : b[j++]);
    }
    return result.concat(i < a.length ? a.slice(i) : b.slice(j));
}
// O(nlgn)
function mergeSort(raw, compare) {
    function sort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        /* tslint:disable:no-bitwise */
        var mid = arr.length >> 1;
        return merge(sort(arr.slice(0, mid)), sort(arr.slice(mid)), compare);
    }
    return sort(raw);
}
exports.merge = mergeSort;
