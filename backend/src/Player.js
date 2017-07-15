class Player {
    constructor(name, websocket) {
        this.name = name;
        this.websocket = websocket;
        this.lord = false;
    }

    // we don't want to try to serialize the websocket
    toJSON() {
        return {
            name: this.name,
            lord: this.lord
        };
    }

    sendMessage(message) {
        this.websocket.send(JSON.stringify(message));
    }

    makeLord() {
        this.lord = true;
    }

    reset() {
        this.lord = false;
    }
}

export default Player;
