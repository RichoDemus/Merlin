import {describe, it} from "mocha";
import app from "../src/server";
import WebSocket from "ws";
const expect = require('chai').expect;

describe("Test Backend", () => {
    it("Connects and handshakes", done => {
        const client = createClient(msg => {
            const expected = JSON.stringify({type: "DEBUG", msg: "Welcome"});
            expect(JSON.stringify(msg)).to.equal(expected);
            done();
        });
    });
});

const createClient = onMessage => {
    const client = {};
    const socket = new WebSocket("ws://localhost:8080/websocket");

    client.send = socket.send;
    socket.onmessage = msg => {
        onMessage(JSON.parse(msg.data));
    };

    return client;
};
