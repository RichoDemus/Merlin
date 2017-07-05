class Player {
    constructor(name, websocket) {
        this.name = name;
        this.websocket = websocket;
    }

    // we don't want to try to serialize the websocket
    toJSON() {
        return {
            name: this.name
        };
    }
}

export default Player;
