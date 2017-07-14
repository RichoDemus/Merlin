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

    newGame() {
        const goodGuyMessage = {type: "NEW_GAME", role: "GOOD", friends:[]};

        console.log("Players:", this.players.map(p => p.name));
        const evilPlayers = getRandom(this.players, numEvilPlayers(this.players.length));
        const goodPlayers = getGoodPlayers(this.players, evilPlayers);
        console.log("Evil players:", evilPlayers.map(player => player.name));
        console.log("Good players:", goodPlayers.map(player => player.name));
        goodPlayers.forEach(player => player.sendMessage(goodGuyMessage));
        evilPlayers.forEach(player => player.sendMessage(badGuyMessage(player, evilPlayers)))
    }

    endGame() {
        console.log("Ending game...");
        const endGameMessage = {type: "GAME_ENDED"};
        this.players.forEach(player => player.sendMessage(endGameMessage));
    }
}

// credits: https://stackoverflow.com/a/19270021
function getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}
// it 5 or 6, evil lord knows minions
// 5 or 6 => 2, 7 or 8 => 3, 9 or 10 => 4
const numEvilPlayers = num => Math.floor((num-1) / 2);

const getGoodPlayers = (players, evilPlayers) => {
    const evilPlayerNames = evilPlayers.map(player => player.name);
    return players.filter(player => !evilPlayerNames.includes(player.name));
};

const badGuyMessage = (player, evilPlayers) => {
    const evilFriends = evilPlayers.filter(p => p.name !== player.name);
    return {type: "NEW_GAME", role: "EVIL", friends: evilFriends};
};


export default Room;
