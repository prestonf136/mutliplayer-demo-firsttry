const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
const content2 = require('fs').readFileSync(__dirname + '/index2.html', 'utf8');

const http = require('http');
const express = require("express");

let toplus = 0

let world = {
    "id1":{
        "gun":"SAW",
        "position":"0",
        "shooting":false
    },
    "id2":{
        "gun":"SAW",
        "position":"0",
        "shooting":false
    }
}

const app = express()

const WebSocket = require('ws');
const server = http.createServer(app);

const wss = new WebSocket.Server({ port: 8080 });
server.listen(3000);

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(update) {
        let teest = update.split("|");
        if (teest[0] == "id1") {
            world.id1.position = teest[1]
        } else if (teest[0] == "id2") {
            world.id2.position = teest[1]
        }
        console.log(teest)
    });
    setInterval(() => {
        ws.send(JSON.stringify(world));
    }, 0100);
});



app.get("/id1",(req,res) => {
    res.end(content);
});

app.get("/id2",(req,res) => {
    res.end(content2);
});