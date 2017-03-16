const structure = require('../').structure;
const frame = require('./frame');
const assert = require('assert');

function generate(len, max = 10000) {
    const arr = [];
    while (len > 0) {
        arr.push(Math.floor(Math.random() * max));
        len--;
    }
    return arr;
}

function checkBST(bst) {
    function check(current) {
        if (current !== null) {
            if ((!current.left || current.left.key <= current.key) &&
                (!current.right || current.right.key >= current.key)) {
                check(current.left);
                check(current.right);
            } else {
                console.log(current.left, current, current.right);
                throw new Error('Error BST Structure');
            }
        }
    }
    check(bst.root);
}

function checkRBT(rbt) {
    function check(current) {
        if (current.key !== 'Nil') {
            if ((current.left.key === 'Nil' || current.left.key <= current.key) &&
                (current.right.key === 'Nil' || current.right.key >= current.key)) {
                check(current.left);
                check(current.right);
            } else {
                console.log(current.left.key, current.key, current.right.key);
                throw new Error('Error BST Structure');
            }
        }
    }
    check(rbt.root);
}
/*
function printRBT(node) {
    if (node.key !== 'Nil') {
        console.log(node.left.key, node.key, node.right.key);
        printRBT(node.left);
        printRBT(node.right);
    }
}
*/

let f = frame('structure');
const arr = generate(100);
f.check('binary search tree', function () {
    const bst = new structure.BSTree((a, b) => a - b);
    for (let i of arr) {
        bst.insert(i);
    }
    checkBST(bst);
    bst.delete(bst.search(arr[8]));
    bst.delete(bst.search(arr[16]));
    bst.delete(bst.search(arr[32]));
    bst.delete(bst.search(arr[64]));
    checkBST(bst)
});
f.check('red black tree', function () {
    const rbt = new structure.RBTree((a, b) => a - b);
    for (let i of arr) {
        rbt.insert(i);
    }
    checkRBT(rbt);
    rbt.delete(rbt.search(arr[8]));
    rbt.delete(rbt.search(arr[16]));
    rbt.delete(rbt.search(arr[32]));
    rbt.delete(rbt.search(arr[64]));
    checkRBT(rbt);
});
f.check('priority queue, heap', function () {
    const pq = new structure.PriorityQueue((a, b) => a - b);
    const rbt = new structure.RBTree((a, b) => a - b);

    for (let i of arr) {
        pq.push(i);
        rbt.insert(i);
    }
    let maximun = rbt.maximun();
    assert.equal(pq.top(), maximun.key);
    assert.equal(pq.pop(), maximun.key);
    rbt.delete(maximun);
    maximun = rbt.maximun();
    assert.equal(pq.pop(), maximun.key);
});
f.check('stack, queue', function () {
    const s = new structure.Stack();
    const q = new structure.Queue();
    s.push(...arr);
    q.push(...arr);
    assert.equal(s.top(), arr[arr.length - 1]);
    assert.equal(q.back(), arr[arr.length - 1]);
    assert.equal(q.front(), arr[0]);
})
f.end();