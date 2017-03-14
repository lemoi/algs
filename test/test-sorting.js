const sorting = require('../').sorting;
const frame = require('./frame');

function generate(len, max = 10000) {
    const arr = [];
    while (len > 0) {
        arr.push(Math.floor(Math.random() * max));
        len--;
    }
    return arr;
}

function check(arr, ltg = true) {
    const check_ltg = (a, b) => a <= b;
    const check_gtl = (a, b) => a >= b;
    const fn = ltg ?  check_ltg : check_gtl;
    for (let i = 0; i < arr.length - 1; i++) {
        if (!fn(arr[i], arr[i + 1])) {
            throw Error();
        }
    }
}
let f = frame('sorting');
let raw = generate(10);
f.check('bubble sort', function () {
    let sorted = sorting.bubble(raw, (a, b) => a - b);
    check(sorted);
});

f.check('selection sort', function () {
    let sorted = sorting.selection(raw, (a, b) => a - b);
    check(sorted);
});

f.check('insertion sort', function () {
    let sorted = sorting.insertion(raw, (a, b) => a - b);
    check(sorted);
});

f.check('merge sort', function () {
    let sorted = sorting.merge(raw, (a, b) => a - b);
    check(sorted);
});

f.check('quick sort', function () {
    let sorted = sorting.quick(raw, (a, b) => a - b);
    check(sorted);
});

f.check('shortBubble sort', function () {
    let sorted = sorting.shortBubble(raw, (a, b) => a - b);
    check(sorted);
});

f.check('shell sort', function () {
    let sorted = sorting.shell(raw, (a, b) => a - b);
    check(sorted);
});

f.check('heap sort', function () {
    let sorted = sorting.heap(raw, (a, b) => a - b);
    check(sorted);
});
f.end();
