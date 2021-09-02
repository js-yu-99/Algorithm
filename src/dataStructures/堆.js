/**
 * 二叉堆 常被应用于优先队列。
 * 是一种特殊的二叉树。有两个特性：
 * 1. 是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点。并且最后一层的子节点尽可能都是左侧子节点，这叫做结构特性
 * 2. 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。
 *    所有的节点都大于等于（最大堆）或小于等于（最小堆）每个它的子节点。这叫做堆特性
 */

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

// 最小堆
export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    /**
     * 要访问使用普通数组的二叉树节点，我们可以用下面的方式操作 index。
       对于给定位置 index 的节点：
        1.它的左侧子节点的位置是 2 * index + 1（如果位置可用）；
        2.它的右侧子节点的位置是 2 * index + 2（如果位置可用）；
        3.它的父节点位置是 index / 2（如果位置可用）
     */
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
    // 插入新值
    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }
    // 移除最小值或最大值，并返回这个值
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        this.siftDown(0);
        return removedValue;
    }
    // 返回最小值或最大值且不会移除这个值
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    siftUp(index) {
        let parent = this.getParentIndex(index); // 获取父节点位置
        while ( // 如果插入的值小于父节点
            index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.LESS_THAN
        ) {
            swap(this.heap, parent, index); // 就进行交换
            index = parent;
            parent = this.getParentIndex(index);
        }
    }
    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index); // 获取左节点的值
        const right = this.getRightIndex(index); // 获取右节点的值
        const size = this.size();
        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) > // 如果元素比左侧子节点要小，就交换位置
            Compare.BIGGER_THAN
        ) {
            element = left;
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) > // 如果元素比右侧子节点要小，就交换位置
            Compare.BIGGER_THAN
        ) {
            element = right;
        }
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }

    // siftUp(index) {
    //     if (index === 0) {
    //         return;
    //     }
    //     const parentIndex = this.getParentIndex(index);
    //     if (this.heap[parentIndex] > this.heap[index]) {
    //         swap(this.heap, parentIndex, index);
    //         this.siftUp(parentIndex);
    //     }
    // }
    // siftDown(index) {
    //     const leftIndex = this.getLeftIndex(index);
    //     const rightIndex = this.getRightIndex(index);
    //     if (this.heap[leftIndex] < this.heap[index]) {
    //         swap(this.heap, leftIndex, index);
    //         this.siftDown(leftIndex);
    //     }
    //     if (this.heap[rightIndex] < this.heap[index]) {
    //         swap(this.heap, rightIndex, index);
    //         this.siftDown(rightIndex);
    //     }
    // }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
}

const heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);
console.log(heap.heap); // 1 2 4 5 3
/**
 *       1
 *    |     |
 *    2     4
 * |    |
 * 5    3
 */
console.log(heap.findMinimum());
console.log(heap.extract());
console.log(heap.heap);

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

// 最大堆
export class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}

const maxHeap = new MaxHeap();
maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);
maxHeap.insert(1);
console.log(maxHeap.heap); // 5 4 3 2 1
