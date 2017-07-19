import {CONNECTED_TO_SERVER} from "../Networking/Actions";

export const connected = (state = "", action) => {
    switch (action.type) {
        case CONNECTED_TO_SERVER:
            return createRoom();
        default:
            return state;
    }
};
