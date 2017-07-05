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

    sendMessage(message) {
        this.websocket.send(JSON.stringify(message));
    }
}

export default Player;
