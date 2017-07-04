import Room from "./Room";

class Rooms {
    constructor() {
        this.rooms = new Map();
    }

    get size() {
        return this.rooms.size;
    }

    createRoom(hostPlayer) {
        const room = new Room(hostPlayer);
        this.rooms.set(room.roomNumber, room);
        return room;
    }
}

export default Rooms;
