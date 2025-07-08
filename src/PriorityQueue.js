/**
 * Priority Queue implementation using Max Heap
 */
class PriorityQueue {
    constructor(compareFn = null) {
        this.heap = [];
        // Default: higher priority number = higher priority
        this.compare = compareFn || ((a, b) => a.priority > b.priority);
    }

    /**
     * Add an item with priority
     * @param {*} item - The item to add
     * @param {number} priority - The priority of the item
     */
    enqueue(item, priority) {
        const node = { item, priority };
        this.heap.push(node);
        this.heapifyUp();
    }

    /**
     * Remove and return the highest priority item
     * @returns {*} The highest priority item
     * @throws {Error} If queue is empty
     */
    dequeue() {
        if (this.heap.length === 0) {
            throw new Error("Priority queue is empty");
        }
        
        const max = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heapifyDown();
        }
        
        return max.item;
    }

    /**
     * Get the highest priority item without removing it
     * @returns {*} The highest priority item
     * @throws {Error} If queue is empty
     */
    peek() {
        if (this.heap.length === 0) {
            throw new Error("Priority queue is empty");
        }
        return this.heap[0].item;
    }

    /**
     * Get the priority of the highest priority item
     * @returns {number} The highest priority
     * @throws {Error} If queue is empty
     */
    peekPriority() {
        if (this.heap.length === 0) {
            throw new Error("Priority queue is empty");
        }
        return this.heap[0].priority;
    }

    /**
     * Check if queue is empty
     * @returns {boolean} True if queue is empty
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Get size of queue
     * @returns {number} Size of queue
     */
    size() {
        return this.heap.length;
    }

    /**
     * Clear the queue
     */
    clear() {
        this.heap = [];
    }

    /**
     * Get all items as array (for debugging)
     * @returns {Array} Array of {item, priority} objects
     */
    toArray() {
        return [...this.heap];
    }

    // Helper methods
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

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.compare(this.heap[index], this.parent(index))) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && 
                this.compare(this.rightChild(index), this.leftChild(index))) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.compare(this.heap[index], this.heap[largerChildIndex]) || 
                this.heap[index].priority === this.heap[largerChildIndex].priority) {
                break;
            }
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
}

module.exports = PriorityQueue;