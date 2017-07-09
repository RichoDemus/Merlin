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

    return client;
};
