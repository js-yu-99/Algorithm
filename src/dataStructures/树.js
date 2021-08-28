/**
 * 一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点
 * 位于树顶部的节点叫作根节点。它没有父节点。树中的每个元素都叫作节点，节点分为内部节点和外部节点。
 * 至少有一个子节点的节点称为内部节点。没有子元素的节点称为外部节点或叶节点。
 * 一个节点可以有祖先和后代。一个节点（除了根节点）的祖先包括父节点、祖父节点、曾祖父节点等。
 * 一个节点的后代包括子节点、孙子节点、曾孙节点等。
 * 子树由节点和它的后代构成。
 * 节点的一个属性是深度，节点的深度取决于它的祖先节点的数量。
 * 树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级。根节点在第 0 层，它的子节点在第 1 层，以此类推。
 */


// 二叉搜索树（ BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。

export class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null; // 左侧子节点引用
        this.right = null; // 右侧子节点引用
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(key, compareKey) {
    if (key > compareKey) {
        return Compare.BIGGER_THAN;
    } else if (key < compareKey) {
        return Compare.LESS_THAN;
    } else {
        return 0;
    }
}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // 用来比较节点值
        this.root = null; // Node 类型的根节点
    }
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    // 中序遍历
    // 中序遍历的一种应用就是对树进行排序操作。
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback); // {1}
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback); // left
            callback(node.key); // value
            this.inOrderTraverseNode(node.right, callback); // right
        }
    }

    // 先序遍历
    // 先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    // 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // 搜索树的最小值
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

    // 搜索树的最大值
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }

    // 搜索特定值是否存在
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }
    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 键等于 node.key
            // 第一种情况
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // 第二种情况
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // 第三种情况
            const aux = this.minNode(node.right); // 获取右侧子树的最小节点，填充为当前节点
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key); // 并且在右侧子树中删除这个节点
            return node;
        }
    }
}

// 中序、先序、后序遍历指的是调用当前节点本身的位置。

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(12);
tree.insert(8);
tree.insert(1);
tree.insert(15);
console.log(tree);

tree.inOrderTraverse((key) => {
    console.log(key); // 1 8 10 12 15
})
console.log('===');
console.log(tree.min()); // {key: 1}
console.log(tree.max()); // {key: 15}



/**
 * 自平衡树（AVL树）。添加或移除节点时，AVL树会尝试保持自平衡。任何一个节点的左右子树高度最多相差1。
 * 添加或移除节点时，AVL树会尽可能尝试转换为完全树
 */

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
}
