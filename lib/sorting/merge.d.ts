import { comparator } from './comparator';
declare function mergeSort<T>(raw: T[], compare: comparator<T>): T[];
export { mergeSort as merge };
