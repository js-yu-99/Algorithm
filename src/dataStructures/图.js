/**
 * 图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。任何二元关系都可以用图来表示
 * G = (v, E) V: 一组顶点  E: 一组边，连接V中的顶点
 * 相关术语：
 * 由一条线连接到一起的顶点被称为相邻顶点
 * 一个顶点的度是相邻顶点的数量
 * 路径是顶点之间的连续序列
 * 图的路径可以是有方向的，单向或者双向的，双向的路径称为强连通的
 * 图可以是未加权的或者加权的，加权指路径有具体的权值
 */

import { Dictionary } from './字典和散列表.js';

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected; // 图是否有向
        this.vertices = []; // 储存顶点名
        this.adjList = new Dictionary(); // 通过字典储存邻接表 字典将会使用顶点的名字作为键，邻接顶点列表作为值
    }
    addVertex(v) { // 添加点
        if (!this.vertices.includes(v)) { // 点不存在时添加到顶点和邻接表中
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }
    addEdge(v, w) { // 添加顶点之间的边
        if (!this.adjList.get(v)) { // 添加顶点到顶点存储数组中
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += `${neighbors[j]} `;
            }
            s += '\n';
        }
        return s;
    }
}

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

// 图的遍历
/**
 * 广度优先搜索 BFS  -》 队列  按层访问顶点
 * 
 * 深度优先搜索 DFS  -》 栈
 */

/**
 * 白色：表示该顶点还没有被访问。
 * 灰色：表示该顶点被访问过，但并未被探索过。
 * 黑色：表示该顶点被访问过且被完全探索过。
 */
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};

const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

// 广度优先搜索
import { Queue } from './队列.js';

export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices); // 初始化为白色，代表还没被访问
    const queue = new Queue();
    queue.enqueue(startVertex);
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY; // 内部的顶点如果是白色，改为灰色，表示被访问过
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK; // 遍历完一个顶点的相邻顶点后，表示这个顶点已经被探索完
        if (callback) {
            callback(u);
        }
    }
};

const printVertex = (value) => console.log('Visited vertex: ' + value);
breadthFirstSearch(graph, myVertices[0], printVertex);