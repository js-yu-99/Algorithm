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

function isValid(str) {
    if (!str) {
        return true;
    }
    const stack = new Stack();
    const len = str.length;
    for (let i = 0;i < len;i++) {
        const s = str[i];
        const symbolStr = symbolMap[s];
        if (symbolStr) {
            stack.push(symbolStr);
        } else {
            if (!stack.size() || stack.pop() !== s) {
                return false;
            }
        }
    }
    return !stack.size();
}

console.log(isValid(str1)); // true
console.log(isValid(str2)); // true
console.log(isValid(str3)); // false
