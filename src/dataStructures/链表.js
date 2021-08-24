export function defaultEquals(a, b) {
    return a === b;
}

export class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

// 单向链表
export class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    push(element) { // 向链表尾部添加一个新元素
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    insert(element, index) { // 向链表特定位置插入一个新元素
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                previous.next = node;
                node.next = current;
            }
        }
        return undefined;
    }
    getElementAt(index) { // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (var i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    remove(element) { // 从链表中移除一个元素
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) { // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    removeAt(index) { // 从链表的特定位置移除一个元素
        if (index >= 0 && index < this.count) { // 检查越界值
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    isEmpty() { // 如果链表中不包含任何元素，返回true，如果链表长度大于0 返回 false
        return this.size() === 0;
    }
    size() { // 返回链表包含的元素个数，与数组的length类似
        return this.count;
    }
    toString() { // 返回表示整个链表的字符串
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head;
        for (let i = 0; i < this.size() && current != null; i++) {
            objString += `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
    getHead() {
        return this.head;
    }
}
const list = new LinkedList();
list.push(11);
list.push(12);
list.push(14);
list.push(15);
console.log(list.getElementAt(3));
console.log(list.indexOf(15));
console.log(list.getHead());


// 双向链表
class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                // 如果只有一项，更新 tail
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) { // 最后一项
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                // 将 previous 与 current 的下一项链接起来——跳过 current
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

// 循环链表
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    // 更新最后一个元素
                    this.head = node;
                    current.next = this.head;
                }
            } else { // 这种场景没有变化
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                // 不需要修改循环链表最后一个元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
