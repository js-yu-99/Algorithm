
// 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

var arr1 = [1, 5, 3, 44, 2, 6, 10, 7];

function bubbleSort(array) {
    const len = array.length;
    for(let i = 0;i < len;i++) {
        for(let j = 0;j < len; j++) {
            if (array[i] < array[j]) {
                swap(array, i, j);
            }
        }
    }
}
bubbleSort(arr1);
console.log(arr1);