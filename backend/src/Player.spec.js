import {describe, it} from "mocha";
import Player from "./Player";
import {expect} from "chai";

describe("Test Player", () => {
    it("serializes to json without websocket", () => {
        const target = new Player("richo", "websocket-mock");
        expect(JSON.stringify(target)).to.equal(JSON.stringify({name: "richo", team: null, role: null}));
    });
});
