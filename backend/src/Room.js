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
        this.players.push(player);
    }
}

export default Room;
