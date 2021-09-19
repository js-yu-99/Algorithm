// 从一个集合中取出n个元素，有多少种组合

/**
 * 
 * @param {*} S 数组，需要求组合的集合
 * @param {*} K 取出元素个数
 */
function combination(S, K) {
    if (K === 0 || S.length === K) {
        return [S.slice(0, K)];
    }
    const [first, ...others] = S;
    let r = [];
    r = r.concat(combination(others, K -1)).map(c => {
        return [first, ...c];
    });
    r = r.concat(combination(others, K));
    return r;
}

console.log(combination([1, 2, 3, 4], 2));