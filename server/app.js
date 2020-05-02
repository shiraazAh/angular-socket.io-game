const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http)

var rectPosition = {
    mainX: 200,
    mainY: 200,
    bulletX: 205,
    bulletY: 205
};

var bulletRectPosition = {
    x: 205,
    y: 205
}

function shooting() {
    return rectPosition.bulletX++
}

Socketio.on("connection", socket => {
    socket.emit("rectPosition", rectPosition);
    socket.on("move", data => {
        switch(data) {
            case "left":
                rectPosition.mainX = rectPosition.mainX - 10;
                rectPosition.bulletX = rectPosition.bulletX - 10;
                Socketio.emit("rectPosition", rectPosition);
                break;
            case "right":
                rectPosition.mainX = rectPosition.mainX + 10;
                rectPosition.bulletX = rectPosition.bulletX + 10;
                Socketio.emit("rectPosition", rectPosition);
                break;
            case "up":
                rectPosition.mainY = rectPosition.mainY - 10;
                rectPosition.bulletY = rectPosition.bulletY - 10;
                Socketio.emit("rectPosition", rectPosition);
                break;
            case "down":
                rectPosition.mainY = rectPosition.mainY + 10;
                rectPosition.bulletY = rectPosition.bulletY + 10;
                Socketio.emit("rectPosition", rectPosition);
                break;
            case "shoot":
                setInterval(shooting, 10);
                setInterval(() => {
                    Socketio.emit("rectPosition", rectPosition);
                }, 100);
        }
    })
})

Http.listen(3000, () => {
    console.log("listening at port 3000......")
})
