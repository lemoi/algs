"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// O(n^2)
function bubble(raw, compare, cover) {
    var dest = cover ? raw : raw.slice();
    var bound = raw.length - 1;
    var edge = bound;
    for (var i = 0; i < bound; i++) {
        var current = dest[0];
        var next = void 0;
        var tmp = 0;
        for (var j = 0; j < edge; j++) {
            next = dest[j + 1];
            if (compare(current, next) > 0) {
                dest[j + 1] = current;
                dest[j] = next;
                tmp = j;
            }
            else {
                current = next;
            }
        }
        edge = tmp;
    }
    return dest;
}
exports.bubble = bubble;
