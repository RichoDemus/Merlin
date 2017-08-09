import {playerJoined, playerLeft} from "./Messages";

class Room {
    constructor(hostPlayer, roomNumber) {
        this.players = [];
        this.players.push(hostPlayer);
        this.roomNumber = roomNumber;
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
        const goodGuyMessage = {type: "NEW_GAME", team: "liberal", role: "liberal", friends: []};

        console.log("Players:", this.players.map(p => p.name));
        const evilPlayers = getRandom(this.players, numEvilPlayers(this.players.length));
        const goodPlayers = without(this.players, evilPlayers);
        console.log("Evil players:", evilPlayers.map(player => player.name));
        console.log("Good players:", goodPlayers.map(player => player.name));

        goodPlayers.forEach(player => {
            player.setTeam("liberal");
            player.setRole("liberal");
        });

        evilPlayers.forEach(player => {
            player.setTeam("fascist");
            player.setRole("fascist");
        });

        const hitler = getRandom(evilPlayers, 1);
        hitler[0].setRole("hitler");

        const evilMinions = without(evilPlayers, hitler);

        goodPlayers.forEach(player => player.sendMessage(goodGuyMessage));
        evilMinions.forEach(player => player.sendMessage(badGuyMessage(player, hitler[0], evilPlayers)));
        hitler.forEach(player => player.sendMessage(evilLordMessage(player, evilPlayers, this.players.length)));
    }

    endGame() {
        console.log("Ending game...");
        const endGameMessage = {type: "GAME_ENDED"};
        this.players.forEach(player => player.reset());
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

// 5 or 6 => 2, 7 or 8 => 3, 9 or 10 => 4
const numEvilPlayers = num => Math.floor((num - 1) / 2);

const badGuyMessage = (player, lord, evilPlayers) => {
    const evilFriends = evilPlayers.filter(p => p.name !== player.name);
    return {type: "NEW_GAME", team: "fascist", role: "fascist", friends: evilFriends};
};

const evilLordMessage = (player, evilPlayers, totalNumPlayers) => {
    if (canLordSeeMinions(totalNumPlayers)) {
        const evilFriends = evilPlayers.filter(p => p.name !== player.name);
        return {type: "NEW_GAME", team: "fascist", role: "hitler", friends: evilFriends};
    } else {
        return {type: "NEW_GAME", team: "fascist", role: "hitler", friends: []};
    }
};

// it 5 or 6, evil lord knows minions
const canLordSeeMinions = numPlayers => numPlayers === 5 || numPlayers === 6;

// Returns a new array of players without the exluded players
const without = (players, excludes) => {
    const excludedPlayerNames = excludes.map(player => player.name);
    return players.filter(player => !excludedPlayerNames.includes(player.name));
};

export default Room;
