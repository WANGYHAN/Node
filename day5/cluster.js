const cluster = require("cluster")

const http = require("http")

const numCPUs = require("os").cpus().length

if (cluster.isMaster) {
    console.log(`主进程${process.pid}正在进行`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on("exit", (Worker, code, signal) => {
        console.log(`工作进程${Worker.process.pid}已退出`)
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end("hello world")
    }).listen(8888)
    console.log(`工作进程${process.pid}已启动`)
}