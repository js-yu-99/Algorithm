/**
 * 求字符串abc的全排列个数  是个数的阶乘个
 * abc => abc acb bac bca cab cba
 */

/**
 * 
 * @param {*} str 全集
 * @param {*} decisions 已经选择的字符
 */
function permutation(str, decisions = []) {
    if (str.length === decisions.length) {
        return decisions.join('');
    }
    let r = [];
    for (let i = 0;i < str.length; i++) {
        if (!decisions.includes(str[i])) {
            const _list = [...decisions];
            _list.push(str[i]);
            r = r.concat(permutation(str, _list));
        }
    }
    return r;
}

console.log(permutation('1234'));