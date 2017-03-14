import { compareFunction } from '../utils';

export class Node<T> {
    parent: Node<T> | null;
    left: Node<T> | null;
    right: Node<T> | null;
    key: T;
    value?: any;
    constructor (key: T, value?: any) {
        this.key = key;
        this.parent = null;
        this.left = null;
        this.right = null;
        if (value !== undefined) {
            this.value = value;
        }
    }
}

export class BSTree<T> {
    private comp: compareFunction<T>;
    root: Node<T> | null;
    constructor(compare: compareFunction<T>) {
        this.comp = compare;
        this.root = null;
    }

    insert(key: T, value?: any): void {
        let pointer = this.root;
        let parent = null;
        while (pointer !== null) {
            parent = pointer;
            if (this.comp(key, pointer.key) < 0) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        const node = new Node<T>(key, value);
        node.parent = parent;
        if (parent === null) {
            this.root = node;
        } else if (this.comp(key, parent.key) < 0) {
            parent.left = node;
        } else {
            parent.right = node;
        }
    }

    search(key: T): Node<T> | null {
        let pointer = this.root;
        while (pointer !== null && pointer.key !== key) {
            if (key < pointer.key) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        return pointer;
    }

    minimun(current?: Node<T>): Node<T> | null {
        let pointer: Node<T> | null;
        if (current) {
            pointer = current;
        } else if (this.root !== null) {
            pointer = this.root;
        } else {
            return null;
        }
        while (pointer.left !== null) {
            pointer = pointer.left;
        }
        return pointer;
    }

    maximun(current?: Node<T>): Node<T> | null {
        let pointer: Node<T> | null;
        if (current) {
            pointer = current;
        } else if (this.root !== null) {
            pointer = this.root;
        } else {
            return null;
        }
        while (pointer.right !== null) {
            pointer = pointer.right;
        }
        return pointer;
    }

    private transplant(u: Node<T>, v: Node<T> | null): void {
        if (u.parent === null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v !== null) {
            v.parent = u.parent;
        }
    }

    delete(node: Node<T>): void {
        if (node.left === null) {
            this.transplant(node, node.right);
        } else if (node.right === null) {
            this.transplant(node, node.left);
        } else {
            const alt = this.minimun(node.right) as Node<T>;
            if (alt.parent !== node) {
                this.transplant(alt, alt.right);
                alt.right = node.right;
                alt.right.parent = alt;
            }
            this.transplant(node, alt);
            alt.left = node.left;
            alt.left.parent = alt;
        }
    }
}
