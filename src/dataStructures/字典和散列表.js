function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString(); // {1}
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

// Map 字典

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    set(key, value) {
        if (key != null && value !== null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.tableKey[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    clear() {
        this.table = {};
    }
    size() {
        return this.keyValues().length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }
    keyValues() {
        // return Object.values(this.table);
        const valuePairs = [];
        for (const k in this.table) { // {1}
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k]); // {2}
            }
        }
        return valuePairs;
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues(); // {1}
        for (let i = 0; i < valuePairs.length; i++) { // {2}
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3}
            if (result === false) {
                break; // {4}
            }
        }
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`; // {1}
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`; // {2}
        }
        return objString; // {3}
    }
}

const dictionary = new Dictionary();
dictionary.set('name', 'wangyu');
dictionary.set('address', 'beijing');
dictionary.set('age', 20);
console.log(dictionary.size());
console.log(dictionary.values());
console.log(dictionary.keyValues());



class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
}


const hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

/**
 * 除了 Set 和 Map 这两种新的数据结构， ES2015还增加了它们的弱化版本， WeakSet 和 WeakMap。
 * 基本上， Map 和 Set 与其弱化版本之间仅有的区别是：
 * WeakSet 或 WeakMap 类没有 entries、 keys 和 values 等方法；
 * 只能用对象作为键。
 * 
 * 创建和使用这两个类主要是为了性能。 WeakSet 和 WeakMap 是弱化的（用对象作为键），
 * 没有强引用的键。这使得 JavaScript 的垃圾回收器可以从中清除整个入口。
 */