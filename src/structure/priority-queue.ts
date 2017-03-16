import { MaxHeap } from './heap';

export class PriorityQueue<T> extends MaxHeap<T> {
    empty(): boolean {
        return this.size() === 0;
    }

    top(): T | undefined {
        return this.elements[1] as T | undefined;
    }
} 