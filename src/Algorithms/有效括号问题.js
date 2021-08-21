/**
 * “有效括号”问题
 * 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 * "()" => true
 * "()[]{}" => true
 * "([)]" => false
 *  "{[]}" => true
 */

// 使用栈结构解决问题

import { Stack } from "../dataStructures/栈.js";

const str1 = '{[]}', str2 = '(){}[]', str3 = '([)]';

const symbolMap = {
    '(': ')',
    '{': '}',
    '[': ']',
}

// function isValid(str) {
//     if (!str) {
//         return true;
//     }
//     const stack = new Stack();
//     const len = str.length;
//     for (let i = 0;i < len;i++) {
//         const s = str[i];
//         if (symbolMap[s]) {
//             stack.push(symbolMap[s]);
//         } else {
//             const p = stack.pop();
//             if (stack.isEmpty() || stack.pop() !== s) {
//                 return false;
//             }
//         }
//     }
//     return !stack.size();
// }

const isValid = function (s) {
    // 结合题意，空字符串无条件判断为 true
    if (!s) {
        return true;
    }
    // 初始化 stack 数组
    const stack = [];
    // 缓存字符串长度
    const len = s.length;
    // 遍历字符串
    for (let i = 0; i < len; i++) {
        // 缓存单个字符
        const ch = s[i];
        // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
        const symbolStr = symbolMap[ch];
        if (symbolStr) {
            stack.push(symbolStr);
        } else { // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
            // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
            if (!stack.length || stack.pop() !== ch) {
                return false;
            }
        }
    }
    // 若所有的括号都能配对成功，那么最后栈应该是空的
    return !stack.length;
};


console.log(isValid(str1));
console.log(isValid(str2));
console.log(isValid(str3));
