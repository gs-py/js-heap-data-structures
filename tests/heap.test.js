const {
  MinHeap,
  MaxHeap,
  PriorityQueue,
  heapSort,
  findKLargest,
  findKSmallest,
} = require("../index");

describe("MinHeap", () => {
  let minHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  test("should insert and maintain min heap property", () => {
    const values = [5, 3, 8, 1, 9, 2, 7];
    values.forEach((val) => minHeap.insert(val));

    expect(minHeap.peek()).toBe(1);
    expect(minHeap.size()).toBe(7);
  });

  test("should extract minimum elements in order", () => {
    const values = [5, 3, 8, 1, 9, 2, 7];
    values.forEach((val) => minHeap.insert(val));

    const extracted = [];
    while (!minHeap.isEmpty()) {
      extracted.push(minHeap.extractMin());
    }

    expect(extracted).toEqual([1, 2, 3, 5, 7, 8, 9]);
  });

  test("should throw error when extracting from empty heap", () => {
    expect(() => minHeap.extractMin()).toThrow("Heap is empty");
  });

  test("should build heap from array", () => {
    const array = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
    const heap = MinHeap.buildHeap(array);

    expect(heap.peek()).toBe(1);
    expect(heap.size()).toBe(10);
  });

  test("should work with custom comparator", () => {
    const heap = new MinHeap((a, b) => a.priority < b.priority);
    heap.insert({ name: "Task 1", priority: 5 });
    heap.insert({ name: "Task 2", priority: 1 });
    heap.insert({ name: "Task 3", priority: 3 });

    expect(heap.peek().name).toBe("Task 2");
  });
});

describe("MaxHeap", () => {
  let maxHeap;

  beforeEach(() => {
    maxHeap = new MaxHeap();
  });

  test("should insert and maintain max heap property", () => {
    const values = [5, 3, 8, 1, 9, 2, 7];
    values.forEach((val) => maxHeap.insert(val));

    expect(maxHeap.peek()).toBe(9);
    expect(maxHeap.size()).toBe(7);
  });

  test("should extract maximum elements in order", () => {
    const values = [5, 3, 8, 1, 9, 2, 7];
    values.forEach((val) => maxHeap.insert(val));

    const extracted = [];
    while (!maxHeap.isEmpty()) {
      extracted.push(maxHeap.extractMax());
    }

    expect(extracted).toEqual([9, 8, 7, 5, 3, 2, 1]);
  });

  test("should throw error when extracting from empty heap", () => {
    expect(() => maxHeap.extractMax()).toThrow("Heap is empty");
  });
});

describe("PriorityQueue", () => {
  let pq;

  beforeEach(() => {
    pq = new PriorityQueue();
  });

  test("should enqueue and dequeue by priority", () => {
    pq.enqueue("Low priority", 1);
    pq.enqueue("High priority", 10);
    pq.enqueue("Medium priority", 5);

    expect(pq.dequeue()).toBe("High priority");
    expect(pq.dequeue()).toBe("Medium priority");
    expect(pq.dequeue()).toBe("Low priority");
  });

  test("should peek without removing", () => {
    pq.enqueue("Task 1", 5);
    pq.enqueue("Task 2", 10);

    expect(pq.peek()).toBe("Task 2");
    expect(pq.size()).toBe(2);
  });

  test("should throw error when dequeuing from empty queue", () => {
    expect(() => pq.dequeue()).toThrow("Priority queue is empty");
  });
});

describe("Utility Functions", () => {
  test("heapSort should sort array correctly", () => {
    const unsorted = [64, 34, 25, 12, 22, 11, 90];
    const sorted = heapSort(unsorted);

    expect(sorted).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  test("heapSort should sort in descending order", () => {
    const unsorted = [64, 34, 25, 12, 22, 11, 90];
    const sorted = heapSort(unsorted, false);

    expect(sorted).toEqual([90, 64, 34, 25, 22, 12, 11]);
  });

  test("findKLargest should return K largest elements", () => {
    const nums = [3, 2, 1, 5, 6, 4];
    const result = findKLargest(nums, 3);

    expect(result).toEqual([6, 5, 4]);
  });

  test("findKSmallest should return K smallest elements", () => {
    const nums = [3, 2, 1, 5, 6, 4];
    const result = findKSmallest(nums, 3);

    expect(result).toEqual([1, 2, 3]);
  });

  test("should throw error for invalid K values", () => {
    const nums = [1, 2, 3];

    expect(() => findKLargest(nums, 0)).toThrow(
      "K must be between 1 and array length"
    );
    expect(() => findKLargest(nums, 4)).toThrow(
      "K must be between 1 and array length"
    );
  });
});
// ... existing code ...

describe("Advanced MinHeap Tests", () => {
  let minHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  test("should handle duplicate values correctly", () => {
    const values = [3, 3, 3, 1, 2, 1, 2];
    values.forEach((val) => minHeap.insert(val));

    const extracted = [];
    while (!minHeap.isEmpty()) {
      extracted.push(minHeap.extractMin());
    }

    expect(extracted).toEqual([1, 1, 2, 2, 3, 3, 3]);
  });

  test("should maintain heap property after multiple operations", () => {
    // Insert some values
    [5, 3, 8].forEach((val) => minHeap.insert(val));

    // Extract min
    expect(minHeap.extractMin()).toBe(3);

    // Insert more values
    [1, 2].forEach((val) => minHeap.insert(val));

    // Extract all and verify order
    expect(minHeap.extractMin()).toBe(1);
    expect(minHeap.extractMin()).toBe(2);
    expect(minHeap.extractMin()).toBe(5);
    expect(minHeap.extractMin()).toBe(8);
  });

  test("should handle large datasets efficiently", () => {
    const size = 10000;
    const values = Array.from({ length: size }, (_, i) => size - i);

    // Measure insertion time
    const startInsert = performance.now();
    values.forEach((val) => minHeap.insert(val));
    const endInsert = performance.now();

    expect(endInsert - startInsert).toBeLessThan(1000); // Should take less than 1 second
    expect(minHeap.size()).toBe(size);
    expect(minHeap.peek()).toBe(1);
  });
});

describe("Advanced MaxHeap Tests", () => {
  let maxHeap;

  beforeEach(() => {
    maxHeap = new MaxHeap();
  });

  test("should handle negative numbers correctly", () => {
    const values = [-5, -3, -8, -1, -9, -2, -7];
    values.forEach((val) => maxHeap.insert(val));

    const extracted = [];
    while (!maxHeap.isEmpty()) {
      extracted.push(maxHeap.extractMax());
    }

    expect(extracted).toEqual([-1, -2, -3, -5, -7, -8, -9]);
  });

  test("should handle mixed positive and negative numbers", () => {
    const values = [-5, 3, -8, 1, 9, -2, 0];
    values.forEach((val) => maxHeap.insert(val));

    expect(maxHeap.peek()).toBe(9);
    expect(maxHeap.extractMax()).toBe(9);
    expect(maxHeap.extractMax()).toBe(3);
    expect(maxHeap.extractMax()).toBe(1);
  });
});

describe("Advanced PriorityQueue Tests", () => {
  test("should handle complex priority scenarios", () => {
    const pq = new PriorityQueue();

    // Test with same priority but different values
    pq.enqueue("Task A", 5);
    pq.enqueue("Task B", 5);
    pq.enqueue("Task C", 5);

    // Higher priority tasks should be processed first
    pq.enqueue("Urgent Task", 10);

    // Lower priority tasks
    pq.enqueue("Low Priority 1", 1);
    pq.enqueue("Low Priority 2", 1);

    // Verify dequeue order
    expect(pq.dequeue()).toBe("Urgent Task");
    const samePriorityTasks = [pq.dequeue(), pq.dequeue(), pq.dequeue()];
    expect(samePriorityTasks).toContain("Task A");
    expect(samePriorityTasks).toContain("Task B");
    expect(samePriorityTasks).toContain("Task C");

    expect(pq.dequeue()).toBe("Low Priority 1");
    expect(pq.dequeue()).toBe("Low Priority 2");
  });

  test("should handle priority updates", () => {
    const pq = new PriorityQueue();

    pq.enqueue("Task 1", 1);
    pq.enqueue("Task 2", 2);
    pq.enqueue("Task 3", 3);

    // Update priorities
    pq.updatePriority("Task 1", 4);
    pq.updatePriority("Task 2", 5);

    expect(pq.dequeue()).toBe("Task 2");
    expect(pq.dequeue()).toBe("Task 1");
    expect(pq.dequeue()).toBe("Task 3");
  });
});

describe("Advanced Utility Function Tests", () => {
  test("heapSort should handle empty and single-element arrays", () => {
    expect(heapSort([])).toEqual([]);
    expect(heapSort([1])).toEqual([1]);
  });

  test("findKLargest should handle edge cases with duplicates", () => {
    const nums = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4];
    expect(findKLargest(nums, 5)).toEqual([4, 4, 3, 3, 3]);
  });

  test("findKSmallest should maintain order with floating point numbers", () => {
    const nums = [3.14, 2.718, 1.414, 1.732, 2.236];
    expect(findKSmallest(nums, 3)).toEqual([1.414, 1.732, 2.236]);
  });

  test("should handle large arrays efficiently", () => {
    const size = 100000;
    const array = Array.from({ length: size }, (_, i) => Math.random() * size);

    const startTime = performance.now();
    const sorted = heapSort(array);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(1000); // Should take less than 1 second
    expect(sorted.length).toBe(size);

    // Verify it's sorted
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i] >= sorted[i - 1]).toBeTruthy();
    }
  });
});
