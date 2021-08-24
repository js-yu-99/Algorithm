/**
 * 集合是由一组无序且唯一（即不能重复）的项组成的。
 */

class Set {
    constructor() {
        this.items = {};
    }
    has(element) {
        /*
         * Object 原型有 hasOwnProperty 方法。该方法返回一个表明对象是否具有特定属性的布尔值。
         *  in 运算符则返回表示对象在原型链上是否有特定属性的布尔值。
        */
        // return element in this.items;
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
    // 并集
    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    // 交集
    intersection(otherSet) {
        const intersectionSet = new Set(); // {1}
        const values = this.values(); // {2}
        const otherValues = otherSet.values(); // {3}
        let biggerSet = values; // {4}
        let smallerSet = otherValues; // {5}
        if (otherValues.length - values.length > 0) { // {6}
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => { // {7}
            if (biggerSet.includes(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }
    // 差集
    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        })
        return differenceSet;
    }
    // 子集
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}

const set1 = new Set();
set1.add(10);
set1.add(20);

const set2 = new Set();
set2.add(30);
set2.add(20);

console.log(set1.union(set2));
console.log(set1.intersection(set2));