/**
 * 输入：["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"] 
 */

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    const len = s.length;
    if (len < 2) {
        return s;
    }
    for(let i = 0; i < Math.floor(len / 2); i++) {
        const _i = len - i - 1;
        if (s[i] !== [_i]) {
            let p = s[i];
            s[i] = s[_i];
            s[_i] = p;
        }
    }
};

var arr = ["h","e","l","l","o"];
reverseString(arr);
console.log(arr);

var arr1 = ["H","a","n","n","a","h"];
reverseString(arr1);
console.log(arr1);
