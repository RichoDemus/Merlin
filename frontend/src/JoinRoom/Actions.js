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
    return function (dispatch) {
        dispatch(gotoLoadingView());
        dispatch(connect());
        return setupRoom().then(
            sauce => dispatch(gotoLobbyView()),
            //sauce => dispatch({type: "SEND_CHAT_MESSAGE"}),
            error => dispatch(gotoErrorView())
        );
    };
};

const setupRoom = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000);
    });
};
