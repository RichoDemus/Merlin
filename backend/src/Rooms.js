import Room from "./Room";

class Rooms {
    constructor() {
        this.rooms = [];
    }

    get size() {
        return this.rooms.length;
    }

    createRoom(hostPlayer) {
        const roomNumber = randomValueNotInArray(this.rooms.map(room => room.roomNumber));
        const room = new Room(hostPlayer, roomNumber);
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

        return "<ul>" + this.rooms.map(room => "<li>" + room.roomNumber + "(" + room.players.map(player => player.name).join(",") + ")</li>").join("") + "</ul>";
    }
}

// from https://stackoverflow.com/a/6979340
const randomValueNotInArray = array => {
    console.log("array:", array, "type:", typeof array);
    let roomNumber;
    do {
        roomNumber = Math.floor(Math.random() * 9000) + 1000
    } while (array.includes(roomNumber));
    return roomNumber;
};

export default Rooms;
