export interface CompareFn<T> {
    (a: T, b: T): boolean;
}

export declare class MinHeap<T = number> {
    constructor(compareFn?: CompareFn<T>);
    
    peek(): T;
    extractMin(): T;
    insert(value: T): void;
    size(): number;
    isEmpty(): boolean;
    toArray(): T[];
    clear(): void;
    
    static buildHeap<T>(array: T[], compareFn?: CompareFn<T>): MinHeap<T>;
}

export declare class MaxHeap<T = number> {
    constructor(compareFn?: CompareFn<T>);
    
    peek(): T;
    extractMax(): T;
    insert(value: T): void;
    size(): number;
    isEmpty(): boolean;
    toArray(): T[];
    clear(): void;
    
    static buildHeap<T>(array: T[], compareFn?: CompareFn<T>): MaxHeap<T>;
}

export interface PriorityQueueItem<T> {
    item: T;
    priority: number;
}

export declare class PriorityQueue<T = any> {
    constructor(compareFn?: CompareFn<PriorityQueueItem<T>>);
    
    enqueue(item: T, priority: number): void;
    dequeue(): T;
    peek(): T;
    peekPriority(): number;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    toArray(): PriorityQueueItem<T>[];
}

export declare function heapSort<T>(arr: T[], ascending?: boolean): T[];

export declare function findKLargest(nums: number[], k: number): number[];

export declare function findKSmallest(nums: number[], k: number): number[];

export declare function mergeKSortedArrays(arrays: number[][]): number[];

export declare function isValidHeap(arr: number[], isMinHeap?: boolean): boolean;