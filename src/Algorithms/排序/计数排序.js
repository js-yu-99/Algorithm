/**
 * 计数排序是一个分布式排序。
 * 分布式排序使用已组织好的辅助数据结构，然后进行合并，得到排好序的数组。
 * 计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组。
 * 在所有元素都计数完成后，临时数组已排好序并可迭代以构建排序后的结果数组
*/

function counting_sort(A) {
    // 数组最大值
    const max = Math.max(...A);
    // 累计数组
    const B = Array(max + 1).fill(0);
    // 结果数组
    const C = Array(A.length);
    // 累计位递增
    A.forEach((_, i) => B[A[i]]++);
    // 累计求和
    for (let i = 0; i < B.length; i++) {
        B[i] = B[i - 1] + B[i];
    }
    // 结果取出
    for (let i = 0; i < A.length; i++) {
        const p = B[A[i]] - 1; // 回写位置
        B[A[i]]--; // 新回写结果
        C[p] = A[i]; // 回写结果
    }
    return C;
}


/**
 * 时间复杂度 O(n) + O(k) + O(1) + O(n) + O(k) + O(n) = O(n + k)
 * 空间复杂度 O(n + k)
 */