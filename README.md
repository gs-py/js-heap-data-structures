# JS Heap Data Structures

A comprehensive JavaScript implementation of Min Heap and Max Heap data structures with practical utilities including Priority Queue and heap-based algorithms.

## Features

- **MinHeap**: Efficient min-heap implementation with O(log n) insertion and extraction
- **MaxHeap**: Efficient max-heap implementation with O(log n) insertion and extraction
- **PriorityQueue**: Priority queue implementation using max-heap
- **Heap Sort**: O(n log n) sorting algorithm
- **Utility Functions**: Find K largest/smallest elements, merge sorted arrays, heap validation
- **Custom Comparators**: Support for custom comparison functions
- **TypeScript Support**: Complete TypeScript definitions included

## Installation

```bash
npm install js-heap-data-structures
```

## Quick Start

```javascript
const { MinHeap, MaxHeap, PriorityQueue, heapSort } = require('js-heap-data-structures');

// Min Heap
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
console.log(minHeap.peek()); // 3
console.log(minHeap.extractMin()); // 3

// Max Heap
const maxHeap = new MaxHeap();
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
console.log(maxHeap.peek()); // 8
console.log(maxHeap.extractMax()); // 8

// Priority Queue
const pq = new PriorityQueue();
pq.enqueue('Low priority task', 1);
pq.enqueue('High priority task', 10);
pq.enqueue('Medium priority task', 5);
console.log(pq.dequeue()); // 'High priority task'

// Heap Sort
const unsorted = [64, 34, 25, 12, 22, 11, 90];
const sorted = heapSort(unsorted);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]
```

## API Reference

### MinHeap

#### Constructor
```javascript
const minHeap = new MinHeap(compareFn);
```
- `compareFn` (optional): Custom comparison function for complex objects

#### Methods

**insert(value)**
- Inserts a value into the heap
- Time Complexity: O(log n)

**extractMin()**
- Removes and returns the minimum element
- Time Complexity: O(log n)
- Throws: Error if heap is empty

**peek()**
- Returns the minimum element without removing it
- Time Complexity: O(1)
- Throws: Error if heap is empty

**size()**
- Returns the number of elements in the heap
- Time Complexity: O(1)

**isEmpty()**
- Returns true if heap is empty
- Time Complexity: O(1)

**toArray()**
- Returns array representation of heap
- Time Complexity: O(n)

**clear()**
- Removes all elements from heap
- Time Complexity: O(1)

#### Static Methods

**buildHeap(array, compareFn)**
- Creates a heap from an existing array
- Time Complexity: O(n)

### MaxHeap

MaxHeap has the same API as MinHeap, but with `extractMax()` instead of `extractMin()`.

### PriorityQueue

#### Constructor
```javascript
const pq = new PriorityQueue(compareFn);
```

#### Methods

**enqueue(item, priority)**
- Adds an item with given priority
- Time Complexity: O(log n)

**dequeue()**
- Removes and returns highest priority item
- Time Complexity: O(log n)
- Throws: Error if queue is empty

**peek()**
- Returns highest priority item without removing it
- Time Complexity: O(1)

**peekPriority()**
- Returns the priority of the highest priority item
- Time Complexity: O(1)

### Utility Functions

**heapSort(array, ascending)**
- Sorts an array using heap sort algorithm
- Time Complexity: O(n log n)
- `ascending` (default: true): Sort direction

**findKLargest(nums, k)**
- Finds K largest elements in array
- Time Complexity: O(n log k)
- Returns: Array of K largest elements in descending order

**findKSmallest(nums, k)**
- Finds K smallest elements in array
- Time Complexity: O(n log k)
- Returns: Array of K smallest elements in ascending order

**mergeKSortedArrays(arrays)**
- Merges K sorted arrays into one sorted array
- Time Complexity: O(n log k) where n is total elements

**isValidHeap(array, isMinHeap)**
- Validates if array represents a valid heap
- Time Complexity: O(n)

## Advanced Usage

### Custom Comparators

```javascript
// For objects
const heap = new MinHeap((a, b) => a.priority < b.priority);
heap.insert({ name: 'Task 1', priority: 5 });
heap.insert({ name: 'Task 2', priority: 1 });

// For custom sorting
const maxHeap = new MaxHeap((a, b) => a.value > b.value);
```

### Building Heap from Array

```javascript
const array = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
const minHeap = MinHeap.buildHeap(array);
console.log(minHeap.toArray()); // Valid min heap
```

### Finding K Largest/Smallest

```javascript
const { findKLargest, findKSmallest } = require('js-heap-data-structures');

const nums = [3, 2, 1, 5, 6, 4];
console.log(findKLargest(nums, 3)); // [6, 5, 4]
console.log(findKSmallest(nums, 3)); // [1, 2, 3]
```

### Merging Sorted Arrays

```javascript
const { mergeKSortedArrays } = require('js-heap-data-structures');

const arrays = [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6]
];
console.log(mergeKSortedArrays(arrays)); // [1, 1, 2, 3, 4, 4, 5, 6]
```

## Time Complexities

| Operation | MinHeap/MaxHeap | PriorityQueue |
|-----------|-----------------|---------------|
| Insert    | O(log n)        | O(log n)      |
| Extract   | O(log n)        | O(log n)      |
| Peek      | O(1)            | O(1)          |
| Build     | O(n)            | N/A           |

## Common Use Cases

1. **Priority Queues**: Task scheduling, Dijkstra's algorithm
2. **Finding K Largest/Smallest**: Top K problems, selection algorithms
3. **Heap Sort**: Efficient sorting algorithm
4. **Merging**: Combining multiple sorted datasets
5. **Median Finding**: Using two heaps (min and max)

## Browser Support

This package works in all modern browsers and Node.js environments that support ES6+.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Testing

```bash
npm test
```

## Examples

Check out the `examples/` directory for more detailed usage examples and real-world applications.

## Changelog

### v1.0.0
- Initial release
- MinHeap and MaxHeap implementations
- PriorityQueue implementation
- Utility functions for common heap operations
- Complete TypeScript support