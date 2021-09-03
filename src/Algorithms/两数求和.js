/**
 * 真题描述： 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */

// map
function twoSum(nums, target) {
    const diffs = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (diffs.size === 0) {
            diffs.set(nums[i], i);
        } else {
            if (diffs.get(target - nums[i])) {
                return [diffs.get(target - nums[i]), i];
            } else {
                diffs.set(nums[i], i);
            }
        }
    }
}
console.log(twoSum([2, 11, 12, 15], 26));