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
}

export default Rooms;
