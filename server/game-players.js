class GamePlayers {
    constructor(p1, p2){
        this.playerOne = p1;
        this.playerTwo = p2;
        this.players = [p1, p2];

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

        this.shooting = () => {
                return this.rectPosition.bulletX++;
        }

        this.emitEverywhere = () => {
            return this.players.forEach(player => player.emit("rectPosition", this.rectPosition));
        }

        this.emitEverywhere();

        this.playerOne.on('move', data => {
                    switch(data) {
                        // Player Movement
                        case "up":
                            this.rectPosition.mainY = this.rectPosition.mainY - 10;
                            this.rectPosition.bulletY = this.rectPosition.bulletY - 10;
                            this.emitEverywhere();
                            break;
                        case "down":
                            this.rectPosition.mainY = this.rectPosition.mainY + 10;
                            this.rectPosition.bulletY = this.rectPosition.bulletY + 10;
                            this.emitEverywhere();
                            break;
                            //Player Shooting.
                        case "shoot":
                            setInterval(this.shooting, 10);
                            setInterval(() => {
                                this.emitEverywhere();
                            }, 100);
                    }
                })
        
        this.playerTwo.on('move', data => {
                    switch(data) {
                        // Player Movement
                        case "up":
                            this.rectPosition.secondY = this.rectPosition.secondY - 10;
                            this.rectPosition.secondBulletY = this.rectPosition.secondBulletY - 10;
                            this.emitEverywhere();
                            break;
                        case "down":
                            this.rectPosition.secondY = this.rectPosition.secondY + 10;
                            this.rectPosition.secondBulletY = this.rectPosition.secondBulletY + 10;
                            this.emitEverywhere();
                            break;
                            //Player Shooting.
                        case "shoot":
                            setInterval(this.shooting, 10);
                            setInterval(() => {
                                this.emitEverywhere();
                            }, 100);
                    }
                })
            }; 
    }

    module.exports = GamePlayers;