import {PLAYER_JOINED, PLAYER_LEFT, ROOM_JOINED} from "../Networking/Actions";
export const room = (state = {}, action) => {
    switch (action.type) {
        case ROOM_JOINED:
            return {
                number: action.number,
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
