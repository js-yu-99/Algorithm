// 分治策略  将问题拆分 单独处理  时间复杂度为O(nlgn)

// 快速排序空间复杂度O(1)  合并排序更适合并发环境

// 根据中心点拆分数组

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function partition(A, lo, hi) {
    const pivot = A[hi - 1];
    let i = lo, j = hi - 1;
    // 小于中心点范围：[lo, i)
    // 未确认范围为：[i, j)
    // 大于中心店范围为：[j, hi - 1)
    while (i !== j) {
        if (A[i] <= pivot) {
            i++;
        } else {
            swap(A, i, --j);
        }
    }
    swap(A, j, hi - 1);
    return j;
}

const A = [10, 50, 30, 90, 40, 80, 70];
const B = [10, 50, 30, 90, 40, 80, 70];
const p1 = partition(A, 0, 7);
const p2 = partition(B, 1, 3);
console.log(p1, p2);

function qsort(A, lo = 0, hi = A.length) {
    if (hi - lo <= 1) return;
    const p = partition(A, lo, hi);
    qsort(A, lo, p);
    qsort(A, p + 1, hi);
}

const C = [10, 50, 30, 90, 40, 80, 70];
qsort(C);
console.log(C);

const D = [90, 80, 70, 50, 40, 20, 10];
qsort(D);
console.log(D);

// 快速排序的优化是使得拆分更加平均