"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// O(n^2)
function insertion(raw, compare, cover) {
    var dest = cover ? raw : raw.slice();
    for (var i = 1; i < dest.length; i++) {
        var key = dest[i];
        var j = i;
        while (--j >= 0 && compare(dest[j], key) > 0) {
            dest[j + 1] = dest[j];
        }
        dest[j + 1] = key;
    }
    return dest;
}
exports.insertion = insertion;
