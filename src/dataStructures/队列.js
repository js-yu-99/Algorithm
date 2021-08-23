// 先进先出 比如排队进场等现象
// 无序的对象比有序的数组获取值时更高效

export class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enqueue(element) { // 向队列尾部添加一个新的项
        this.items[this.count] = element;
        this.count++;
    }
    dequeue() { // 移除队列的第一项并返回被移除的元素
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    peek() { // 返回队列中第一个元素
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    isEmpty() { // 判断队列是否为空
        return this.size() === 0;
    }
    size() { // 获取队列长度
        return this.count - this.lowestCount;
    }
    clear() { // 清空队列
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(9);
console.log(queue.toString());
