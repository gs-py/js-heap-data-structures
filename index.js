const MinHeap = require('./dist/index.cjs.js').MinHeap;
const MaxHeap = require('./dist/index.cjs.js').MaxHeap;
const PriorityQueue = require('./dist/index.cjs.js').PriorityQueue;
const { heapSort, findKLargest, findKSmallest } = require('./dist/index.cjs.js');

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