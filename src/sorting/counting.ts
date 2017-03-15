import { keyFunction } from '../utils';

function getRange<T>(raw: T[], key: keyFunction<T>): [number, number] {
    let current = key(raw[0]);
    let next = key(raw[1]);
    let max;
    let min;
    if (current > next) {
        max = current;
        min = next;
    } else {
        max = next;
        min = current;
    }

    for (let i = 2; i < raw.length; i += 2) {
        current = key(raw[i]);
        next = key(raw[i + 1]);
        if (current < next) {
            if (current < min) {
                min = current;
            }
            if (next > max) {
                max = next;
            }
        } else {
            if (next < min) {
                min = next;
            }
            if (current > max) {
                max = current;
            }
        }
    }
    return [min, max];
}

export function counting<T>(raw: T[], key: keyFunction<T>, range?: [number, number]): T[] {
    if (!range) {
        range = getRange(raw, key);
    }

    const buffer = Array(range[1] - range[0] + 1);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = 0;
    }

    for (let i = 0; i < raw.length; i++) {
        const pos = key(raw[i]) - range[0];
        buffer[pos]++;
    }

    for (let j = 1; j < buffer.length; j++) {
        buffer[j] = buffer[j] + buffer[j - 1];
    }

    const dest: T[] = Array(raw.length);
    for (let j = raw.length - 1; j >= 0; j--) {
        const pos = key(raw[j]) - range[0];
        dest[buffer[pos] - 1] = raw[j];
        buffer[pos]--;
    }
    return dest;
}
