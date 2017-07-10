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

    it("Connects and handshakes", done => {
        createClient().then(_ => done());
    });

    it("Carl creates a room", () => {
        const assertRoomJoined = ({msg}) => {
            expect(msg.type).to.equal("ROOM_JOINED");
            expect(msg.host).to.equal(true);
            expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name: "Carl"}]));
            expect(msg.number).to.be.a("number");
        };

        return createClient()
            .then(client => client.createRoom("Carl"))
            .then(assertRoomJoined);
    });

    it("Carl creates a room that Jill joins", () => {
        const assertRoomJoined = roomNumber => msg => {
            expect(msg.type).to.equal("ROOM_JOINED");
            expect(msg.host).to.equal(false);
            expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name: "Carl"}, {name: "Jill"}]));
            expect(msg.number).to.equal(roomNumber);
        };

        const assertCarlSeesJillJoin = msg => {
            expect(msg.type).to.equal("PLAYER_JOINED");
            expect(msg.player.name).to.equal("Jill");
        };

        const createRoomPromise = createClient()
            .then(client => client.createRoom("Carl"));

        // handle flow and asserts for Jill
        const joinRoomPromise = createRoomPromise
            .then(({msg}) => msg.number)
            .then(room =>
                createClient()
                    .then(client => client.joinRoom("Jill", room))
                    .then(assertRoomJoined(room))
            );

        // handle rest of the flow for Carl
        const roomParticipantReceivesJoinedMessage = createRoomPromise
            .then(({client}) => client.waitForMessageOfType("PLAYER_JOINED"))
            .then(assertCarlSeesJillJoin);

        return Promise.all([joinRoomPromise, roomParticipantReceivesJoinedMessage]);
    });

    it("Carl starts a game", () => {
        const assertNewGame = newGameResponses => {
            console.log("Result:", JSON.stringify(newGameResponses));
            const evilPeople = newGameResponses.filter(msg => msg.role === "EVIL");
            const goodPeople = newGameResponses.filter(msg => msg.role === "GOOD");

            expect(newGameResponses).to.have.lengthOf(5);
            expect(goodPeople).to.have.lengthOf(3);
            expect(evilPeople).to.have.lengthOf(2);
        };

        let carlsClient = null;
        let joiningClients;

        const allJoiningRoomPromise = createClient()
            .then(client => {
                carlsClient = client;
                return client.createRoom("Carl")
            })
            .then(({msg}) => msg.number)
            .then(room => {
                return Promise.all([createClient(), createClient(), createClient(), createClient()])
                    .then(clients => {
                        joiningClients = clients;
                        const names = ["Jill", "Jonas", "James", "Joanna"];
                        return clients.map((client, i) => {
                            client.joinRoom(names[i], room);
                        })
                    })
            });

        const allPlayersInLobbyPromise = allJoiningRoomPromise
            .then(_ => carlsClient.waitForMessageOfType("PLAYER_JOINED"));

        const allPlayersGotTheirRolesPromise = allPlayersInLobbyPromise
            .then(_ => Promise.all([...joiningClients, carlsClient].map(client => client.waitForMessageOfType("NEW_GAME"))))
            .then(assertNewGame);

        const createNewGamePromise = allPlayersInLobbyPromise
            .then(_ => carlsClient.newGame());

        return Promise.all([createNewGamePromise, allPlayersGotTheirRolesPromise]);
    });
});

const createClient = () => {
    const client = {};
    const socket = new WebSocket("ws://localhost:8080/websocket");

    client.send = socket.send;
    client.messages = [];
    let messageListeners = [];

    socket.onmessage = msg => {
        const parsed = JSON.parse(msg.data);
        client.messages.push(parsed);
        messageListeners.forEach(f => f(parsed));
    };

    client.createRoom = name => {
        client.name = name;
        const promise = new Promise((resolve, reject) => {
            const listener = msg => {
                if (msg.type === "ROOM_JOINED") {
                    resolve({msg, client});
                }
            };
            messageListeners.push(listener);
        });
        socket.send(JSON.stringify({type: "CREATE_ROOM", name}));
        return promise;
    };

    client.joinRoom = (name, roomNumber) => {
        client.name = name;
        const promise = new Promise((resolve, reject) => {
            const listener = msg => {
                if (msg.type === "ROOM_JOINED") {
                    resolve(msg);
                } else {
                    console.log(client.name, "Join room listener eating:", msg);
                }
            };
            messageListeners.push(listener);
        });
        socket.send(JSON.stringify({type: "JOIN_ROOM", name, roomNumber}));
        return promise;
    };

    client.waitForMessageOfType = type => {
        console.log(client.name, "waiting for", type);
        return new Promise((resolve, reject) => {
            const listener = msg => {
                console.log(client.name, "Client got message:", msg, "expected", type);
                if (msg.type === type) {
                    resolve(msg);
                    messageListeners = [];
                }
            };
            messageListeners.push(listener);
        });
    };

    client.newGame = roomNumber => {
        const promise = new Promise((resolve, reject) => {
            const listener = msg => {
                if (msg.type === "NEW_GAME") {
                    resolve({msg, client});
                }
            };
            messageListeners.push(listener);
        });
        socket.send(JSON.stringify({type: "NEW_GAME", roomNumber}));
        return promise;
    };

    const connected = resolve => () => {
        resolve(client);
    };

    return new Promise((resolve, reject) => {
        socket.onopen = connected(resolve);
    });
};
