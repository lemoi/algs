import { compareFunction, swap } from '../utils';

/* tslint:disable: no-bitwise */
export abstract class Heap<T> {
    protected elements: Array<null | T>;
    protected comp: compareFunction<T>;
    constructor(comp: compareFunction<T>) {
        this.comp = comp;
        // make the index started with 1;
        this.elements = [null];
    }

    get size(): number {
        return this.elements.length - 1;
    }

    protected abstract check(i: number, j: number): boolean;

    protected siftUp(i: number): void {
        if (i > 1) {
            const parent = i >> 1;
            if (!this.check(parent, i)) {
                swap(this.elements, parent, i);
                this.siftUp(parent);
            }
        }
    }

    protected siftDown(i: number): void {
        const left = i << 1;
        const right = left + 1;
        let tmp = i;
        if (left <= this.size && !this.check(i, left)) {
            tmp = left;
        }
        if (right <= this.size && !this.check(tmp, right)) {
            tmp = right;
        }
        if (tmp !== i) {
            swap(this.elements, i, tmp);
            this.siftDown(tmp);
        }
    }

    push(...elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this.elements.push(elements[i]);
            this.siftUp(this.size);
        }
    }

    pop(): T | undefined {
        if (this.size > 0) {
            return this.elements.pop() as T;
        }
    }

    extract(): T | undefined {
        const size = this.size;
        let element: T | undefined;
        if (size === 1) {
            element = this.elements.pop() as T;
        } else if (size > 1) {
            swap(this.elements, 1, size);
            element = this.elements.pop() as T;
            this.siftDown(1);
        }
        return element;
    }

    forEach(fn: (element: T) => void ): void {
        const copy = this.elements.slice();
        for (let i = this.size; i > 0; i--) {
            fn(this.extract() as T);
        }
        this.elements = copy;
    }

    heapify(arr: T[]): void {
        this.elements = arr;
        this.elements.unshift(null);
        for (let i = arr.length >> 1; i > 0; i--) {
            this.siftDown(i);
        }
    }
}

/* tslint:disable:max-classes-per-file */
export class MaxHeap<T> extends Heap<T> {
    protected check(i: number, j: number): boolean {
        return this.comp(this.elements[i] as T, this.elements[j] as T) >= 0;
    }
}

export class MinHeap<T> extends Heap<T> {
    protected check(i: number, j: number): boolean {
        return this.comp(this.elements[i] as T, this.elements[j] as T) <= 0;
    }
}
