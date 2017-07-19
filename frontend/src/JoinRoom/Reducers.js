import {JOIN_ROOM} from "./Actions";

export const joinRoom = (state = null, action) => {
    switch (action.type) {
        case JOIN_ROOM:
            console.log("Joining room: ", action.roomNumber);
            return state;
        default:
            return state;
    }
};
