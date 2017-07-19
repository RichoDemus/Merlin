class Player {
    constructor(name, websocket) {
        this.name = name;
        this.websocket = websocket;
        this.team = null;
        this.role = null;
    }

    // we don't want to try to serialize the websocket
    toJSON() {
        return {
            name: this.name,
            team: this.team,
            role: this.role,
        };
    }

    sendMessage(message) {
        this.websocket.send(JSON.stringify(message));
    }

    setTeam(team) {
        this.team = team;
    }

    setRole(role) {
        this.role = role;
    }

    reset() {
        this.team = null;
        this.role = null;
    }
}

export default Player;
