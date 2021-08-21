/**
 * 栈是一种遵循后进先出（LIFO）原则的有序集合。新增加或删除的元素都保存在栈的同一端，称为栈顶，另一端就叫栈底。
 * 在栈中，新元素都靠近栈顶，旧元素都靠近栈底。
 * 比如一摞书或一碟盘子
 */

export class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element) { // 添加新元素
        this.items[this.count] = element;
        this.count++;
    }
    pop() { // 移出栈顶元素，同时返回被溢出的元素
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek() { // 返回栈顶的元素，不做任何修改
        if (this.isEmpty()) {
            throw new Error('stack is empty');
        }
        return this.items[this.count - 1];
    }
    isEmpty() { // 判断栈是否为空
        return this.size() === 0;
    }
    clear() { // 移出栈中所有元素
        this.items = {};
        this.count = 0;
    }
    size() { // 返回栈中的元素个数
        return this.count;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
console.log(stack.toString()); // 5,8

function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';
    while (number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}
console.log(decimalToBinary(13450)); 11010010001010


// 为了确保属性的私有性 可以使用WeakMap

const items = new WeakMap(); // {1}
class Stack1 {
    constructor() {
        items.set(this, []); // {2}
    }
    push(element) {
        const s = items.get(this); // {3}
        s.push(element);
    }
    pop() {
        const s = items.get(this);
        const r = s.pop();
        return r;
    }
    // 其他方法
}

const stack1 = new Stack1();
stack1.push(20);
console.log(stack1);