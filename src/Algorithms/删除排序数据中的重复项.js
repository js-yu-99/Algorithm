/**
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/
 *
 * 示例
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2]
 *
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4]
 */

// nums.splice 每次删除数组会造成内存的高消耗
// var removeDuplicates = function (nums) {
//     let startIndex = 0;
//     while(startIndex < nums.length) {
//         if (nums[startIndex] === nums[startIndex + 1]) {
//             nums.splice(startIndex + 1, 1);
//         } else {
//             startIndex++;
//         }
//     }
//     return nums.length;
// };

var removeDuplicates = function (nums) {
    if (nums.length === 0) {
        return 0;
    }
    let left = 0;
    for (let right = 1;right < nums.length;right++) {
        if (nums[left] !== nums[right]) {
            nums[++left] = nums[right];
        }
    }
    nums.length = left + 1;
    return nums.length;
};

var arr1 = [1, 1, 2];
var arr2 = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(arr1), arr1);
console.log(removeDuplicates(arr2), arr2);