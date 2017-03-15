 import { compareFunction } from '../utils';

export enum Color {
    red,
    black
};

let NIL: Node<'Nil'>;

export class Node<T> {
    parent: Node<T | 'Nil'>;
    left: Node<T | 'Nil'>;
    right: Node<T | 'Nil'>;
    key: T;
    color: Color;
    value?: any;
    constructor (key: T, value?: any) {
        this.key = key;
        this.parent = NIL;
        this.left = NIL;
        this.right = NIL;
        if (value !== undefined) {
            this.value = value;
        }
    }
}

NIL = new Node<'Nil'>('Nil');
NIL.color = Color.black;
NIL.parent = NIL;
NIL.left = NIL;
NIL.right = NIL;

/* tslint:disable:max-classes-per-file */
export class RBTree<T> {

    private comp: compareFunction<T>;
    root: Node<T | 'Nil'>;

    constructor(compare: compareFunction<T>) {
        this.comp = compare;
        this.root = NIL;
    }

    leftRotate(node: Node<T>) {
        const alt = node.right;
        node.right = alt.left;
        if (alt.left !== NIL) {
            alt.left.parent = node;
        }
        alt.parent = node.parent;
        if (node.parent === NIL) {
            this.root = alt;
        } else if (node === node.parent.left) {
            node.parent.left = alt;
        } else {
            node.parent.right = alt;
        }
        alt.left = node;
        node.parent = alt;
    }

    rightRotate(node: Node<T>) {
        const alt = node.left;
        node.left = alt.right;
        if (alt.right !== NIL) {
            alt.right.parent = node;
        }
        alt.parent = node.parent;
        if (node.parent === NIL) {
            this.root = alt;
        } else if (node === node.parent.left) {
            node.parent.left = alt;
        } else {
            node.parent.right = alt;
        }
        alt.right = node;
        node.parent = alt;
    }

    insert(key: T, value?: any): void {
        let pointer = this.root;
        let parent: Node<T | 'Nil'> = NIL;
        while (pointer !== NIL) {
            parent = pointer;
            if (this.comp(key, (pointer as Node<T>).key) < 0) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        const node = new Node<T>(key, value);
        node.parent = parent;
        if (parent === NIL) {
            this.root = node;
        } else if (this.comp(key, (parent as Node<T>).key) < 0) {
            parent.left = node;
        } else {
            parent.right = node;
        }
        node.color = Color.red;

        // insert fixup
        let current: Node<T | 'Nil'> = node;
        while (current.parent.color === Color.red) {
            if (current.parent === current.parent.parent.left) {
                const uncle = current.parent.parent.right;
                if (uncle.color === Color.red) {
                    current.parent.color = Color.black;
                    uncle.color = Color.black;
                    current.parent.parent.color = Color.red;
                    current = current.parent.parent;
                } else if (current === current.parent.right) {
                    current = current.parent;
                    this.leftRotate(current as Node<T>);
                } else {
                    current.parent.color = Color.black;
                    current.parent.parent.color = Color.red;
                    this.rightRotate(current.parent.parent as Node<T>);
                }
            } else {
                const uncle = current.parent.parent.left;
                if (uncle.color === Color.red) {
                    current.parent.color = Color.black;
                    uncle.color = Color.black;
                    current.parent.parent.color = Color.red;
                    current = current.parent.parent;
                } else if (current === current.parent.left) {
                    current = current.parent;
                    this.rightRotate(current as Node<T>);
                } else {
                    current.parent.color = Color.black;
                    current.parent.parent.color = Color.red;
                    this.leftRotate(current.parent.parent as Node<T>);
                }
            }
        }
        this.root.color = Color.black;
    }

    search(key: T): Node<T> | null {
        let pointer = this.root;
        while (pointer !== NIL && pointer.key !== key) {
            if (key < pointer.key) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        if (pointer === NIL) {
            return null;
        }
        return pointer as Node<T>;
    }

    minimun(current?: Node<T>): Node<T> | null {
        let pointer: Node<T | 'Nil'>;
        if (current) {
            pointer = current;
        } else if (this.root !== NIL) {
            pointer = this.root;
        } else {
            return null;
        }
        while (pointer.left !== NIL) {
            pointer = pointer.left;
        }
        return pointer as Node<T>;
    }

    maximun(current?: Node<T>): Node<T> | null {
        let pointer: Node<T | 'Nil'>;
        if (current) {
            pointer = current;
        } else if (this.root !== NIL) {
            pointer = this.root;
        } else {
            return null;
        }
        while (pointer.right !== NIL) {
            pointer = pointer.right;
        }
        return pointer as Node<T>;
    }

    private transplant(u: Node<T>, v: Node<T | 'Nil'>): void {
        if (u.parent === NIL) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v !== NIL) {
            v.parent = u.parent;
        }
    }

    delete(node: Node<T>): void {
        let originColor = node.color;
        let marker: Node<T | 'Nil'>;
        if (node.left === NIL) {
            marker = node.right;
            this.transplant(node, node.right);
        } else if (node.right === NIL) {
            marker = node.left;
            this.transplant(node, node.left);
        } else {
            const alt = this.minimun(node.right as Node<T>) as Node<T>;
            originColor = alt.color;
            marker = alt.right;

            if (alt.parent !== node) {
                this.transplant(alt, alt.right);
                alt.right = node.right;
                alt.right.parent = alt;
            }
            this.transplant(node, alt);
            alt.left = node.left;
            alt.left.parent = alt;
            alt.color = node.color;
        }

        // delete fixup
        if (originColor === Color.black) {
            let current = marker;
            while (current !== this.root && current.color === Color.black) {
                if (current === current.parent.left) {
                    let sibling = current.parent.right;
                    if (sibling.color === Color.red) {
                        sibling.color = Color.black;
                        current.parent.color = Color.red;
                        this.leftRotate(current.parent as Node<T>);
                        sibling = current.parent.right;
                    }
                    if (sibling.left.color === Color.black &&
                        sibling.right.color === Color.black) {
                        sibling.color = Color.red;
                        current = current.parent;
                    } else if (sibling.right.color === Color.black) {
                        sibling.left.color = Color.black;
                        sibling.color = Color.red;
                        this.rightRotate(sibling as Node<T>);
                        sibling = current.parent.right;
                    }
                    sibling.color = current.parent.color;
                    current.parent.color = Color.black;
                    sibling.right.color = Color.black;
                    this.leftRotate(current.parent as Node<T>);
                    current = this.root;
                } else {
                    let sibling = current.parent.left;
                    if (sibling.color === Color.red) {
                        sibling.color = Color.black;
                        current.parent.color = Color.red;
                        this.rightRotate(current.parent as Node<T>);
                        sibling = current.parent.left;
                    }
                    if (sibling.right.color === Color.black &&
                        sibling.left.color === Color.black) {
                        sibling.color = Color.red;
                        current = current.parent;
                    } else if (sibling.left.color === Color.black) {
                        sibling.right.color = Color.black;
                        sibling.color = Color.red;
                        this.leftRotate(sibling as Node<T>);
                        sibling = current.parent.left;
                    }
                    sibling.color = current.parent.color;
                    current.parent.color = Color.black;
                    sibling.left.color = Color.black;
                    this.rightRotate(current.parent as Node<T>);
                    current = this.root;
                }
            }
            current.color = Color.black;
        }
    }
}
