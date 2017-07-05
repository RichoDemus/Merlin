import {playerJoined, playerLeft} from "./Messages";
class Room {
    constructor(hostPlayer) {
        this.players = [];
        this.players.push(hostPlayer);
        this.roomNumber = Math.floor(Math.random() * 9000) + 1000;
    }

    get size() {
        return this.players.size;
    }

    join(player) {
        this.players.forEach(it => it.sendMessage(playerJoined(player)));
        this.players.push(player);
    }

    leave(player) {
        return () => {
            this.players = this.players.filter(p => p.name !== player.name);
            this.players.forEach(it => it.sendMessage(playerLeft(player)));
        };
    }
}

export default Room;
