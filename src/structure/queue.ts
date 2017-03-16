/*
Implement queue with the array as backend;
The array's behavior is much like the deque in c++
as the STL queue adaptor implemented in terms of deque
by default.
*/
export class Queue<T> {
    private readonly elements: T[];
    constructor() {
        this.elements = [];
    }

    empty(): boolean {
        return this.elements.length === 0;
    }

    push(...elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this.elements.push(elements[i]);
        }
    }

    pop(): T | undefined {
        return this.elements.shift();
    }

    back(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    front(): T | undefined {
        return this.elements[0];
    }

    size(): number {
        return this.elements.length;
    }
}