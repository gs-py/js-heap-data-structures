/**
 * MinHeap implementation
 * A binary heap where the parent node is always smaller than its children
 */
class MinHeap {
    constructor(compareFn = null) {
        this.heap = [];
        this.compare = compareFn || ((a, b) => a < b);
    }

    // Helper methods for array-based tree navigation
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    // Swap elements at two indices
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    /**
     * Get minimum element (root) without removing it
     * @returns {*} The minimum element
     * @throws {Error} If heap is empty
     */
    peek() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        return this.heap[0];
    }

    /**
     * Extract minimum element (root)
     * @returns {*} The minimum element
     * @throws {Error} If heap is empty
     */
    extractMin() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heapifyDown();
        }
        
        return min;
    }

    /**
     * Insert new element
     * @param {*} value - The value to insert
     */
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    /**
     * Heapify up - maintain heap property after insertion
     */
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.compare(this.heap[index], this.parent(index))) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    /**
     * Heapify down - maintain heap property after extraction
     */
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && 
                this.compare(this.rightChild(index), this.leftChild(index))) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.compare(this.heap[index], this.heap[smallerChildIndex]) || 
                this.heap[index] === this.heap[smallerChildIndex]) {
                break;
            }
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    /**
     * Get size of heap
     * @returns {number} Size of heap
     */
    size() {
        return this.heap.length;
    }

    /**
     * Check if heap is empty
     * @returns {boolean} True if heap is empty
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Get array representation of heap
     * @returns {Array} Array representation
     */
    toArray() {
        return [...this.heap];
    }

    /**
     * Clear the heap
     */
    clear() {
        this.heap = [];
    }

    /**
     * Build heap from array in O(n) time
     * @param {Array} array - Array to build heap from
     * @param {Function} compareFn - Optional comparison function
     * @returns {MinHeap} New MinHeap instance
     */
    static buildHeap(array, compareFn = null) {
        const heap = new MinHeap(compareFn);
        heap.heap = [...array];
        
        // Start from last non-leaf node and heapify down
        for (let i = Math.floor(heap.heap.length / 2) - 1; i >= 0; i--) {
            heap.heapifyDownFrom(i);
        }
        
        return heap;
    }

    /**
     * Heapify down from specific index (for buildHeap)
     * @param {number} index - Starting index
     */
    heapifyDownFrom(index) {
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && 
                this.compare(this.rightChild(index), this.leftChild(index))) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.compare(this.heap[index], this.heap[smallerChildIndex]) || 
                this.heap[index] === this.heap[smallerChildIndex]) {
                break;
            }
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
}

module.exports = MinHeap;