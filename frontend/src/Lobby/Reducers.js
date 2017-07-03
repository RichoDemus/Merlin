import {ROOM_JOINED} from "../Networking/Actions";
export const room =(state = {}, action) => {
    switch(action.type) {
        case ROOM_JOINED:
            return {
                number: action.number,
                users: action.users,
                host: action.host
            };
        default:
            return state;
    }
};
