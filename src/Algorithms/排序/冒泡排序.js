// 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，
function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
const arr1 = [1, 5, 3, 44, 2, 6, 10, 7];
function bubbleSort(array) {
    for(let i = array.length;i >= 1;i--) {
        for(let j = 0;j < i; j++) {
            if (array[j - 1] > array[j]) {
                swap(array, j - 1, j);
            }
        }
    }
}
bubbleSort(arr1);
console.log(arr1);
