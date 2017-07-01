import {gotoErrorView, gotoLoadingView, gotoLobbyView} from "../ViewSelection/Actions";
export const JOIN_ROOM = "JOIN_ROOM";

export const joinRoom = roomNumber => {
    return {
        type: JOIN_ROOM,
        roomNumber
    }
};

export const createRoom = () => {
    return function (dispatch) {
        dispatch(gotoLoadingView());
        return setupRoom().then(
            sauce => dispatch(gotoLobbyView()),
            error => dispatch(gotoErrorView())
        );
    };
};

const setupRoom = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000);
    });
};
