// js 栈的上线  Chrome中是13903
// let i = 0;
// function recursiveFn() {
//     i++;
//     recursiveFn();
// }
// try {
//     recursiveFn();
// } catch (ex) {
//     console.log('i = ' + i + ' error: ' + ex);
// }

/**
 * ECMAScript 2015 有尾调用优化（ tail call optimization）。
 * 如果函数内的最后一个操作是调用函数（就像示例中加粗的那行），
 * 会通过“跳转指令”（ jump） 而不是“子程序调用”（ subroutinecall）来控制。
 * 也就是说，在 ECMAScript 2015 中，这里的代码可以一直执行下去。因此，具有停止递归的基线条件非常重要。
 */

/**
 * 递归求斐波那契数列   0、 1、 1、 2、 3、 5、 8、 13、 21、34
 * 位置 0 的斐波那契数是零。
   1 和 2 的斐波那契数是 1。
   n（此处 n > 2）的斐波那契数是（ n  1）的斐波那契数加上（ n  2）的斐波那契数。
 */

function fibonacci(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(8));

// 记忆递归
function fibonacciMemoization(n) {
    const memo = [0, 1]; // {1}
    const fibonacci = (n) => {
        if (memo[n] != null) return memo[n]; // {2}
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); // {3}
    };
    return fibonacci;
}