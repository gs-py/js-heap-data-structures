// index.js - Main entry point for the heap package
const MinHeap = require('./src/MinHeap');
const MaxHeap = require('./src/MaxHeap');
const PriorityQueue = require('./src/PriorityQueue');
const {
  heapSort,
  findKLargest,
  findKSmallest
} = require('./src/utils');
module.exports = {
  MinHeap,
  MaxHeap,
  PriorityQueue,
  heapSort,
  findKLargest,
  findKSmallest
};

// Also export as named exports for convenience
module.exports.MinHeap = MinHeap;
module.exports.MaxHeap = MaxHeap;
module.exports.PriorityQueue = PriorityQueue;
module.exports.heapSort = heapSort;
module.exports.findKLargest = findKLargest;
module.exports.findKSmallest = findKSmallest;
