import {PLAYER_JOINED, PLAYER_LEFT, ROOM_JOINED, ROOM_LEFT} from "../Networking/Actions";

export const room = (state = {}, action) => {
    switch (action.type) {
        case ROOM_JOINED:
            return {
                users: action.users,
                host: action.host
            };
        case PLAYER_JOINED:
            const players = state.users.slice();
            players.push(action.player);
            return Object.assign({}, state, {users: players});
        case PLAYER_LEFT:
            const newPlayers = state.users.filter(p => p.name !== action.player.name);
            return Object.assign({}, state, {users: newPlayers});
        default:
            return state;
    }
};

export const roomNumber = (state = null, action) => {
    switch (action.type) {
        case ROOM_JOINED:
            return action.number;
        case ROOM_LEFT:
            return null;
        default:
            return state;
    }
};
