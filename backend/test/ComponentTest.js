import {describe, it} from "mocha";
import app from "../src/Server";
import WebSocket from "ws";
const expect = require('chai').expect;

describe("Test Backend", () => {
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
            expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name:"Carl"},{name:"Jill"}]));
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
            .then(({client}) => client.getNextMessage())
            .then(assertCarlSeesJillJoin);

        return Promise.all([joinRoomPromise, roomParticipantReceivesJoinedMessage]);
    });
});

const createClient = () => {
    const client = {};
    const socket = new WebSocket("ws://localhost:8080/websocket");

    client.send = socket.send;
    client.messages = [];
    const messageListeners = [];

    socket.onmessage = msg => {
        const parsed = JSON.parse(msg.data);
        client.messages.push(parsed);
        messageListeners.forEach(f => f(parsed));
    };

    client.createRoom = name => {
        const promise = new Promise((resolve, reject) => {
            const listener = msg => {
                if(msg.type === "ROOM_JOINED") {
                    resolve({msg, client});
                }
            };
            messageListeners.push(listener);
        });
        socket.send(JSON.stringify({type: "CREATE_ROOM", name}));
        return promise;
    };

    client.joinRoom = (name, roomNumber) => {
        const promise = new Promise((resolve, reject) => {
            const listener = msg => {
                if(msg.type === "ROOM_JOINED") {
                    resolve(msg);
                }
            };
            messageListeners.push(listener);
        });
        socket.send(JSON.stringify({type: "JOIN_ROOM", name, roomNumber}));
        return promise;
    };

    client.getNextMessage = () => {
        return new Promise((resolve, reject) => {
            socket.onmessage = msg => {
                const parsed = JSON.parse(msg.data);
                resolve(parsed);
            }
        });
    };

    const connected =  resolve => () => {
        resolve(client);
    };

    return new Promise((resolve, reject) => {
        socket.onopen = connected(resolve);
    });
};
