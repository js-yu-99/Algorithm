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