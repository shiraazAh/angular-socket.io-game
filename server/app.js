const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http)

var mainRectPosition = {
    x: 200,
    y: 200
};

var bulletRectPosition = {
    x: 205,
    y: 205
}

function shooting() {
    return bulletRectPosition.x++
}

Socketio.on("connection", socket => {
    socket.emit("mainRectPosition", mainRectPosition);
    socket.emit("bulletRectPosition", bulletRectPosition);
    socket.on("move", data => {
        switch(data) {
            case "left":
                mainRectPosition.x = mainRectPosition.x - 10;
                bulletRectPosition.x = bulletRectPosition.x - 10;
                Socketio.emit("mainRectPosition", mainRectPosition);
                Socketio.emit("bulletRectPosition", bulletRectPosition);
                break;
            case "right":
                mainRectPosition.x = mainRectPosition.x + 10;
                bulletRectPosition.x = bulletRectPosition.x + 10;
                Socketio.emit("mainRectPosition", mainRectPosition);
                Socketio.emit("bulletRectPosition", bulletRectPosition);
                break;
            case "up":
                mainRectPosition.y = mainRectPosition.y - 10;
                bulletRectPosition.y = bulletRectPosition.y - 10;
                Socketio.emit("mainRectPosition", mainRectPosition);
                Socketio.emit("bulletRectPosition", bulletRectPosition);
                break;
            case "down":
                mainRectPosition.y = mainRectPosition.y + 10;
                bulletRectPosition.y = bulletRectPosition.y + 10;
                Socketio.emit("mainRectPosition", mainRectPosition);
                Socketio.emit("bulletRectPosition", bulletRectPosition);
                break;
            case "shoot":
                setInterval(shooting, 10);
                setInterval(() => {
                    Socketio.emit("bulletRectPosition", bulletRectPosition);
                }, 100);
        }
    })
})

Http.listen(3000, () => {
    console.log("listening at port 3000......")
})
