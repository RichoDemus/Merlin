import {afterEach, beforeEach, describe, it} from "mocha";
import createServer from "../src/Server";
import WebSocket from "ws";
import {expect} from "chai";

describe("Test Backend", () => {
    const server = createServer();
    beforeEach("Start Server", () => {
        server.start();
    });

    afterEach("Stop Server", () => {
        server.stop();
    });

    it("Connects and handshakes", () => {
        return createClient("Carl");
    });

    it("Carl creates a room", () => {
        const assertRoomJoined = msg => {
            expect(msg.type).to.equal("ROOM_JOINED");
            expect(msg.host).to.equal(true);
            expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name: "Carl", team: null, role: null}]));
            expect(msg.number).to.be.a("number");
        };

        const carlsClientCreated = createClient("Carl");

        const roomJoined = carlsClientCreated
            .then(client => client.waitForMessageOfType("ROOM_JOINED"))
            .then(assertRoomJoined);

        const roomCreated = carlsClientCreated.then(client => client.createRoom());

        return Promise.all([roomJoined, roomCreated]);
    });

    it("Carl creates a room that Jill joins", () => {
        const assertRoomJoined = (roomNumber, msg) => {
            expect(msg.type).to.equal("ROOM_JOINED");
            expect(msg.host).to.equal(false);
            expect(JSON.stringify(msg.users)).to.equal(
                JSON.stringify([
                    {name: "Carl", team: null, role: null},
                    {name: "Jill", team: null, role: null}
                ]));
            expect(msg.number).to.equal(roomNumber);
        };

        const assertCarlSeesJillJoin = msg => {
            expect(msg.type).to.equal("PLAYER_JOINED");
            expect(msg.player.name).to.equal("Jill");
        };

        const carlsClientCreated = createClient("Carl");

        let carlsClient;
        carlsClientCreated
            .then(client => {
                carlsClient = client
            });

        const carlJoinedRoom = carlsClientCreated
            .then(client => client.waitForMessageOfType("ROOM_JOINED"));

        let roomNumber;
        carlJoinedRoom.then(({number}) => {
            roomNumber = number
        });

        carlsClientCreated
            .then(client => client.createRoom());

        const carlSawJillJoin = carlJoinedRoom
            .then(_ => carlsClient.waitForMessageOfType("PLAYER_JOINED"))
            .then(assertCarlSeesJillJoin);

        const createdJillsClient = carlJoinedRoom.then(_ => createClient("Jill"));

        let jillsClient;
        createdJillsClient.then(client => {
            jillsClient = client
        });

        const jillJoinedRoom = createdJillsClient.then(_ => jillsClient.waitForMessageOfType("ROOM_JOINED"))
            .then(msg => assertRoomJoined(roomNumber, msg));

        createdJillsClient.then(_ => jillsClient.joinRoom(roomNumber));

        return Promise.all([carlSawJillJoin, jillJoinedRoom]);
    });

    it("Carl starts a game with 5 people", () => {
        const assertNewGame = newGameResponses => {
            const evilPeople = newGameResponses.filter(msg => msg.team === "fascist");
            const goodPeople = newGameResponses.filter(msg => msg.team === "liberal");
            const evilLord = evilPeople.filter(player => player.role === "hitler");
            const evilMinion = evilPeople.filter(player => player.role === "fascist");

            expect(newGameResponses).to.have.lengthOf(5);
            expect(goodPeople).to.have.lengthOf(3);
            expect(evilPeople).to.have.lengthOf(2);
            expect(evilLord).to.have.lengthOf(1);
            expect(evilMinion[0].friends[0].role).to.equal("hitler");
            expect(evilLord[0].friends[0].role).to.equal("fascist");
        };

        let carlsClient;

        const carlsClientCreated = createClient("Carl");

        carlsClientCreated.then(client => {
            carlsClient = client
        });

        const carlJoinedRoom = carlsClientCreated
            .then(client => client.waitForMessageOfType("ROOM_JOINED"));

        carlsClientCreated
            .then(client => client.createRoom());

        let roomNumber;
        carlJoinedRoom.then(({number}) => {
            roomNumber = number;
        });

        const otherClientsCreated = carlJoinedRoom
            .then(_ => Promise.all([
                createClient("Jill"),
                createClient("Jonas"),
                createClient("James"),
                createClient("Joanna")
            ]));

        let otherClients;
        otherClientsCreated.then(clients => {
            otherClients = clients;
        });

        const othersJoinedRoom = otherClientsCreated
            .then(clients => clients.map(client => client.waitForMessageOfType("ROOM_JOINED")));

        otherClientsCreated
            .then(clients => clients.map(client => client.joinRoom(roomNumber)));

        const allGotNewGame = othersJoinedRoom
            .then(_ => Promise.all([...otherClients, carlsClient].map(client => client.waitForMessageOfType("NEW_GAME"))))
            .then(assertNewGame);

        othersJoinedRoom
            .then(_ => carlsClient.newGame());

        return allGotNewGame;
    });

    it("Carl starts a game with 7 people", () => {
        const assertNewGame = newGameResponses => {
            const evilPeople = newGameResponses.filter(msg => msg.team === "fascist");
            const goodPeople = newGameResponses.filter(msg => msg.team === "liberal");
            const evilLord = evilPeople.filter(player => player.role === "hitler");
            const evilMinion = evilPeople.filter(player => player.role === "fascist");

            expect(newGameResponses).to.have.lengthOf(7);
            expect(goodPeople).to.have.lengthOf(4);
            expect(evilPeople).to.have.lengthOf(3);
            expect(evilLord).to.have.lengthOf(1);
            expect(evilMinion[0].friends.map(friend => friend.role)).to.have.all.members(["fascist", "hitler"]);
            expect(evilLord[0].friends).to.be.an('array').that.is.empty;
        };

        let carlsClient;

        const carlsClientCreated = createClient("Carl");

        carlsClientCreated.then(client => {
            carlsClient = client
        });

        const carlJoinedRoom = carlsClientCreated
            .then(client => client.waitForMessageOfType("ROOM_JOINED"));

        carlsClientCreated
            .then(client => client.createRoom());

        let roomNumber;
        carlJoinedRoom.then(({number}) => {
            roomNumber = number;
        });

        const otherClientsCreated = carlJoinedRoom
            .then(_ => Promise.all([
                createClient("Jill"),
                createClient("Jonas"),
                createClient("James"),
                createClient("Joanna"),
                createClient("Jax"),
                createClient("Jene")
            ]));

        let otherClients;
        otherClientsCreated.then(clients => {
            otherClients = clients;
        });

        const othersJoinedRoom = otherClientsCreated
            .then(clients => clients.map(client => client.waitForMessageOfType("ROOM_JOINED")));

        otherClientsCreated
            .then(clients => clients.map(client => client.joinRoom(roomNumber)));

        const allGotNewGame = othersJoinedRoom
            .then(_ => Promise.all([...otherClients, carlsClient].map(client => client.waitForMessageOfType("NEW_GAME"))))
            .then(assertNewGame);

        othersJoinedRoom
            .then(_ => carlsClient.newGame());

        return allGotNewGame;
    });
});

const createClient = (name) => {
    const client = {name: name};
    const socket = new WebSocket("ws://localhost:8080/websocket");

    client.send = socket.send;

    client.createRoom = () => {
        console.log(client.name, "creating room");
        socket.send(JSON.stringify({type: "CREATE_ROOM", name: client.name}));
        return new Promise(resolve => resolve(client));
    };

    client.joinRoom = roomNumber => {
        socket.send(JSON.stringify({type: "JOIN_ROOM", name: client.name, roomNumber}));
        console.log(client.name, "Joining room", roomNumber);
        return new Promise(resolve => resolve(client));
    };

    client.waitForMessageOfType = type => {
        console.log(client.name, "waiting for", type);
        return new Promise(resolve => {
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.type === type) {
                    console.log(client.name, "Resolving:", msg.data);
                    resolve(data);
                } else {
                    console.log(client.name, "Discarding:", data);
                }
            }
        });
    };

    client.newGame = roomNumber => {
        socket.send(JSON.stringify({type: "START_NEW_GAME", roomNumber}));
        return new Promise(resolve => resolve(client));
    };

    const connected = resolve => () => {
        resolve(client);
    };

    return new Promise(resolve => {
        socket.onopen = connected(resolve);
    });
};
