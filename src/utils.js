const MinHeap = require('./MinHeap');
const MaxHeap = require('./MaxHeap');

/**
 * Heap Sort implementation
 * @param {Array} arr - Array to sort
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Array} Sorted array
 */
function heapSort(arr, ascending = true) {
    const result = [...arr];
    const n = result.length;
    
    // Build max heap for ascending sort, min heap for descending sort
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i, ascending);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [result[0], result[i]] = [result[i], result[0]];
        
        // Call heapify on reduced heap
        heapify(result, i, 0, ascending);
    }
    
    return result;
}

/**
 * Heapify helper function
 * @param {Array} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Root index
 * @param {boolean} ascending - Sort direction
 */
function heapify(arr, n, i, ascending) {
    let extremeIndex = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (ascending) {
        // For ascending sort, use max heap
        if (left < n && arr[left] > arr[extremeIndex]) {
            extremeIndex = left;
        }
        if (right < n && arr[right] > arr[extremeIndex]) {
            extremeIndex = right;
        }
    } else {
        // For descending sort, use min heap
        if (left < n && arr[left] < arr[extremeIndex]) {
            extremeIndex = left;
        }
        if (right < n && arr[right] < arr[extremeIndex]) {
            extremeIndex = right;
        }
    }
    
    if (extremeIndex !== i) {
        [arr[i], arr[extremeIndex]] = [arr[extremeIndex], arr[i]];
        heapify(arr, n, extremeIndex, ascending);
    }
}

/**
 * Find K largest elements using Min Heap
 * @param {Array} nums - Array of numbers
 * @param {number} k - Number of largest elements to find
 * @returns {Array} K largest elements in descending order
 */
function findKLargest(nums, k) {
    if (k <= 0 || k > nums.length) {
        throw new Error("K must be between 1 and array length");
    }
    
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    
    const result = [];
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extractMin());
    }
    
    return result.reverse(); // Return in descending order
}

/**
 * Find K smallest elements using Max Heap
 * @param {Array} nums - Array of numbers
 * @param {number} k - Number of smallest elements to find
 * @returns {Array} K smallest elements in ascending order
 */
function findKSmallest(nums, k) {
    if (k <= 0 || k > nums.length) {
        throw new Error("K must be between 1 and array length");
    }
    
    const maxHeap = new MaxHeap();
    
    for (const num of nums) {
        maxHeap.insert(num);
        if (maxHeap.size() > k) {
            maxHeap.extractMax();
        }
    }
    
    const result = [];
    while (!maxHeap.isEmpty()) {
        result.push(maxHeap.extractMax());
    }
    
    return result.reverse(); // Return in ascending order
}

/**
 * Merge K sorted arrays using Min Heap
 * @param {Array<Array>} arrays - Array of sorted arrays
 * @returns {Array} Merged sorted array
 */
function mergeKSortedArrays(arrays) {
    if (!arrays || arrays.length === 0) {
        return [];
    }
    
    const minHeap = new MinHeap((a, b) => a.value < b.value);
    const result = [];
    
    // Initialize heap with first element from each array
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            minHeap.insert({
                value: arrays[i][0],
                arrayIndex: i,
                elementIndex: 0
            });
        }
    }
    
    while (!minHeap.isEmpty()) {
        const { value, arrayIndex, elementIndex } = minHeap.extractMin();
        result.push(value);
        
        // Add next element from same array if available
        if (elementIndex + 1 < arrays[arrayIndex].length) {
            minHeap.insert({
                value: arrays[arrayIndex][elementIndex + 1],
                arrayIndex,
                elementIndex: elementIndex + 1
            });
        }
    }
    
    return result;
}

/**
 * Check if array is a valid heap
 * @param {Array} arr - Array to check
 * @param {boolean} isMinHeap - Check for min heap (default: true)
 * @returns {boolean} True if valid heap
 */
function isValidHeap(arr, isMinHeap = true) {
    if (!arr || arr.length <= 1) {
        return true;
    }
    
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;
        
        if (leftChild < arr.length) {
            if (isMinHeap && arr[i] > arr[leftChild]) {
                return false;
            }
            if (!isMinHeap && arr[i] < arr[leftChild]) {
                return false;
            }
        }
        
        if (rightChild < arr.length) {
            if (isMinHeap && arr[i] > arr[rightChild]) {
                return false;
            }
            if (!isMinHeap && arr[i] < arr[rightChild]) {
                return false;
            }
        }
    }
    
    return true;
}

module.exports = {
    heapSort,
    findKLargest,
    findKSmallest,
    mergeKSortedArrays,
    isValidHeap
};