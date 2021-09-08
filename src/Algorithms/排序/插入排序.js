function insert(A, i ,x) {
    let p = i - 1;
    while(p >= 0 && A[p] > x) {
        A[p + 1] = A[p];
        p--;
    }
    A[p + 1] = x;
}
function insertion_sort(A) {
    for (let i = 1; i < A.length; i++) { // 主循环 N - 1次
        insert(A, i, A[i]); // 决定性时间
    }
}

const A = [5, 6, 3, 2, 44, 7];
insertion_sort(A);
console.log(A);

// 插入排序的时间复杂度为O(n^2)  最坏情况下 while循环执行 n - 1次。