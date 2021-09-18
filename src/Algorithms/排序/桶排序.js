import { insertion_sort } from "./插入排序.js";

function bucket_sort(A, K, S) {
    const buckets = Array.from({length: K}, () => []); // O(k)
    // 放入桶中
    for (let i = 0; i < A.length; i++) { // O(n)
        const index = ~~(A[i] / S);
        buckets[index].push(A[i]);
    }
    // 排序每只桶
    for (let i = 0; i < buckets.length; i++) { // 数据平均分配 O(n) 数据极端分配O(n*2)
        insertion_sort(buckets[i]);
    }   
    // 取出数据
    return [].concat(...buckets); // O(n)
}

console.log(bucket_sort([1, 33, 6, 24, 65, 8, 78], 8, 10));
// 时间复杂度 O(n + k) ~ O(n*2)
// 空间复杂度 O(n + k)