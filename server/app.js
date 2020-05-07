const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http)

class GamePlayers {
    constructor(p1, p2){
        this.playerOne = p1;
        this.playerTwo = p2;

        this.rectPosition = {
            mainX: 100,
            mainY: 230,
            bulletX: 105,
            bulletY: 235,
            secondX: 460,
            secondY: 230,
            secondBulletX: 455,
            secondBulletY: 225
        };

        Socketio.emit("rectPosition", this.rectPosition);

        this.playerOne.on('move', data => {
                    switch(data) {
                        // Player Movement
                        case "up":
                            this.rectPosition.mainY = this.rectPosition.mainY - 10;
                            this.rectPosition.bulletY = this.rectPosition.bulletY - 10;
                            Socketio.emit("rectPosition", this.rectPosition);
                            break;
                        case "down":
                            this.rectPosition.mainY = this.rectPosition.mainY + 10;
                            this.rectPosition.bulletY = this.rectPosition.bulletY + 10;
                            Socketio.emit("rectPosition", this.rectPosition);
                            break;
                            //Player Shooting.
                        case "shoot":
                            setInterval(this.shooting, 10);
                            setInterval(() => {
                                Socketio.emit("rectPosition", rectPosition);
                            }, 100);
                    }
                })
        
        this.playerTwo.on('move', data => {
                    switch(data) {
                        // Player Movement
                        case "up":
                            this.rectPosition.secondY = this.rectPosition.secondY - 10;
                            this.rectPosition.secondBulletY = this.rectPosition.secondBulletY - 10;
                            Socketio.emit("rectPosition", this.rectPosition);
                            break;
                        case "down":
                            this.rectPosition.secondY = this.rectPosition.secondY + 10;
                            this.rectPosition.secondBulletY = this.rectPosition.secondBulletY + 10;
                            Socketio.emit("rectPosition", this.rectPosition);
                            break;
                            //Player Shooting.
                        case "shoot":
                            setInterval(this.shooting, 10);
                            setInterval(() => {
                                Socketio.emit("rectPosition", rectPosition);
                            }, 100);
                    }
                })
            }; 
    }

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
