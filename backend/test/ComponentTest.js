import {describe, it} from "mocha";
import app from "../src/server";
import WebSocket from "ws";
const expect = require('chai').expect;

describe("Test Backend", () => {
    it("Connects and handshakes", done => {
        createClient(() => {}, msg => {
            const expected = JSON.stringify({type: "DEBUG", msg: "Welcome"});
            expect(JSON.stringify(msg)).to.equal(expected);
            done();
        });
    });

    it("Creates a room", done => {
        const onOpen = client => () => {
            client.createRoom("richo");
        };
        const onMessage = msg => {
            if(msg.type !== "ROOM_JOINED") {
                return;
            }
            expect(msg.type).to.equal("ROOM_JOINED");
            expect(msg.host).to.equal(true);
            expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name:"richo"}]));
            expect(msg.number).to.be.a("number");
            done();
        };
        createClient(onOpen, onMessage);
    });

    it("Joins a room", done => {
        // setup Host
        const hostOnOpen = client => () => {
            client.createRoom("Carl");
        };
        const hostOnMessage = msg => {
            if(msg.type !== "ROOM_JOINED") {
                return;
            }
            const roomNumber = msg.number;

            const onOpen = client => () => {
                // setup client
                client.joinRoom("Jill", roomNumber);
            };
            const onMessage = msg => {
                if(msg.type !== "ROOM_JOINED") {
                    return;
                }
                expect(msg.type).to.equal("ROOM_JOINED");
                expect(msg.host).to.equal(false);
                expect(JSON.stringify(msg.users)).to.equal(JSON.stringify([{name:"Carl"},{name:"Jill"}]));
                expect(msg.number).to.equal(roomNumber);
                done();
            };
            createClient(onOpen, onMessage);
        };
        createClient(hostOnOpen, hostOnMessage);
    });
});

const createClient = (onOpen, onMessage) => {
    const client = {};
    const socket = new WebSocket("ws://localhost:8080/websocket");

    client.send = socket.send;
    socket.onopen = onOpen(client);
    socket.onmessage = msg => {
        onMessage(JSON.parse(msg.data));
    };

    client.createRoom = name => {
        socket.send(JSON.stringify({type: "CREATE_ROOM", name}));
    };

    client.joinRoom = (name, roomNumber) => {
        socket.send(JSON.stringify({type: "JOIN_ROOM", name, roomNumber}));
    };

    return client;
};
