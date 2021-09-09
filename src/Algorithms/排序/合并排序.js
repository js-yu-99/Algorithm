// 合并排序 (归并排序)
// 执行过程：
// 1.将原数组不断查分，直到长度为1
// 2.不断将已排序数据合并直到再次合并成原数组
// 总的 时间复杂度 O(nlgn)  空间复杂度 O(n)

//       时间复杂度  空间复杂度
// 拆分时   O(n)      O(1)
// 归并时   O(nlgn)   O(n)

// A 数组 p左半边开始位置  q 左半边结束，右半边开始  r右半边结束
function merge(A, p, q, r) {
    let A1 = A.slice(p, q);
    let A2 = A.slice(q, r);
    // 追加哨兵
    A1.push(Number.MAX_SAFE_INTEGER);
    A2.push(Number.MAX_SAFE_INTEGER);

    for (let k = p, i = 0, j = 0; k < r;k++) {
        // 循环不变式
        // k: 下一个写入位置
        // i: A1中的回写位置
        // j: A2中的回写位置
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++];
    }
}
function merge_sort(A, p, r) {
    if (r - p < 2) { return }
    const q = Math.ceil((p + r) / 2);
    merge_sort(A, p, q);
    merge_sort(A, q, r);
    merge(A, p, q, r);
}

const A = [38, 27, 43, 3, 9, 82, 10];
merge_sort(A, 0, A.length);
console.log(A);