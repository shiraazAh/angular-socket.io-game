const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http)

// Player One Position
var rectPosition = {
    mainX: 100,
    mainY: 230,
    bulletX: 105,
    bulletY: 235
};

//Player One shooting Function
function shooting() {
    return rectPosition.bulletX++
}

// On Connection
Socketio.on("connection", socket => {
    //Sending players Position
    socket.emit("rectPosition", rectPosition);
    // Code For Player Movement And Shooting
    socket.on("move", data => {
        switch(data) {
            // Player Movement
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
                //Player Shooting.
            case "shoot":
                setInterval(shooting, 10);
                setInterval(() => {
                    Socketio.emit("rectPosition", rectPosition);
                }, 100);
        }
    })
})
// Listen to server. 
Http.listen(3000, () => {
    console.log("listening at port 3000......")
})
