const structure = require('../').structure;
const frame = require('./frame');


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
            if ((!current.left || current.left.key < current.key) &&
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

let f = frame('structure');
f.check('binary search tree', function () {
    const bst = new structure.BSTree((a, b) => a - b);
    const arr = generate(10);
    for (let i of arr) {
        bst.insert(i);
    }
    checkBST(bst);
    const node = bst.search(arr[Math.floor(Math.random() * 10)]);
    bst.delete(node);
    checkBST(bst)
});
f.end();