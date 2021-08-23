import { Queue } from '../dataStructures/队列.js';
// 击鼓传花 - 队列

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