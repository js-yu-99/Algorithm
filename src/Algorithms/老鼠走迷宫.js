// 回溯算法

const maze = [
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1],
    [2, 1, 0, 0, 0, 0]
]

/**
 * 
 * @param {*} maze 迷宫矩阵
 * @param {*} pos 当前位置
 * @param {*} path 路径
 * @param {*} transverse 到过位置的记录
 */
function rat_in_maze(maze, pos=[0, 0], path = [], transverse = []) {
    const [x, y] = pos;
    if (maze[x][y] === 2) { // 基础条件
        return path;
    }
    transverse[x * maze.length + y] = 1;
    const choices = [
        [x + 1, y], [x  - 1,y], [x, y + 1], [x, y - 1]
    ].filter(([x, y]) => {
        return x >= 0 && y >= 0 &&
         x < maze.length && y < maze[0].length &&
         (maze[x][y] !== 1) && !transverse[x * maze.length + y]
    });
    for (let [x, y] of choices) {
        const p = rat_in_maze(maze, [x, y], path.concat([[x, y]]), transverse);
        if (p) return p;
    }
}

console.log(rat_in_maze(maze));