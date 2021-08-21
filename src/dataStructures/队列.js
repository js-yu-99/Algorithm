// 先进先出
class Queue {
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
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
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


// 击鼓传花

function hotPotato(elementsList, num) {
    const queue = new Queue();
    const elementedList = [];

    for (var i = 0;i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]);
    }

    while(queue.size() > 1) {
        for (var i = 0;i < num;i++) {
            queue.enqueue(queue.dequeue());
        }
        elementedList.push(queue.dequeue());
    }

    return {
        elementedList: elementedList,
        winner: queue.dequeue()
    }
}
const list = ['王一', '王二', '王三', '王四', '王五', '王六', '王七'];
const result = hotPotato(list, 5);
console.log(result);