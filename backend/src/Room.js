import {playerJoined} from "./Messages";
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
}

export default Room;
