/**
 * 基数排序 分布式排序算法，根据数字的有效位或基数将整数分布到桶中。
 * 基数是基于数组中值的记数制的
*/

function radix_sort(A) {
    const max = Math.max(...A);
    const buckets = Array.from({length: 10}, () => []);
    // 有效数位
    let m = 1;
    while(m < max) {
        // 将数组放入桶中
        A.forEach(number => {
            const digit = ~~((number % (m * 10)) / m);
            buckets[digit].push(number);
        });
        let j = 0;
        buckets.forEach(bucket => {
            while(bucket.length > 0) {
                A[j++] = bucket.shift();
            }
        })
        // 下一个位置
        m *= 10;
        console.log(JSON.stringify(A));
    }
}

const A = [10, 2000, 12, 12, 7, 88, 91, 24];
radix_sort(A);
console.log(A);

// 时间复杂度 O(w*n) 空间复杂度 O(n + w)