import {gotoErrorView, gotoLoadingView, gotoLobbyView} from "../ViewSelection/Actions";
import {connect} from "../Networking/Actions";
export const JOIN_ROOM = "JOIN_ROOM";

export const joinRoom = roomNumber => {
    return {
        type: JOIN_ROOM,
        roomNumber
    }
};

export const createRoom = () => {
    return {
        type: "CREATE_ROOM"
    }
};

const setupRoom = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000);
    });
};
