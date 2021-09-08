// 二分查找  时间复杂度O(lgn)

function bsearch(A, x) { // A 数组；x 需要查找的值；返回x在A中的位置，如果不存在返回-1
    // 循环不变式：循环前后关键变量的含义不变
    let l = 0, // 查询范围左边界
        r = A.length - 1, // 查询范围右边界
        guess; // 猜测位置
    while (l <= r) {
        guess = Math.floor((l + r) / 2);
        // guess等于l，r中间位置；l查找范围左；r查找范围右
        if (A[guess] === x) {
            return guess;
        }
        if (A[guess] > x) {
            r = guess - 1;
        } else {
            l = guess + 1;
        }
    }
    return -1;
}

console.log(bsearch([1, 3, 5, 6, 7, 10], 11));