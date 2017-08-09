import Room from "./Room";

class Rooms {
    constructor() {
        this.rooms = [];
    }

    get size() {
        return this.rooms.length;
    }

    createRoom(hostPlayer) {
        const room = new Room(hostPlayer);
        this.rooms.push(room);
        return room;
    }

    getRoom(roomNumber) {
        return this.rooms.filter(room => room.roomNumber === roomNumber)[0];
    }

    toHtml() {
        if(this.rooms.length === 0) {
            return "<span>No Rooms</span>"
        }

        return "<ul>" + this.rooms.map(room => "<li>" + room.roomNumber + "(" + room.players.map(player => player.name).join(",") + ")</li>") + "</ul>";
    }
}

export default Rooms;
