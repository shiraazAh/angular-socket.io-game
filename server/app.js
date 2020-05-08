const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http)

const GamePlayers = require('./game-players');

let waitingPlayer = null;


// On Connection
Socketio.on("connection", socket => {
    
    if(waitingPlayer) {
        new GamePlayers(waitingPlayer, socket);
        waitingPlayer = null;
    } else {
        waitingPlayer = socket;
        waitingPlayer.emit("msg", 'Waiting For opponent');
    }
})
// Listen to server. 
Http.listen(3000, () => {
    console.log("listening at port 3000......")
})
