export const SET_VIEW = "SET_VIEW";
export const NAME_INPUT_VIEW = "NAME_INPUT_VIEW";
export const JOIN_ROOM_VIEW = "JOIN_ROOM_VIEW";
export const LOADING_VIEW = "LOADING_VIEW";
export const LOBBY_VIEW = "LOBBY_VIEW";
export const ERROR_VIEW = "ERROR_VIEW";
export const GAME_VIEW = "GAME_VIEW";

export const gotoJoinRoomView = () => {
    return {
        type: SET_VIEW,
        view: JOIN_ROOM_VIEW
    }
};

export const gotoLoadingView = () => {
    return {
        type: SET_VIEW,
        view: LOADING_VIEW
    }
};

export const gotoLobbyView = () => {
    return {
        type: SET_VIEW,
        view: LOBBY_VIEW
    }
};

export const gotoErrorView = () => {
    return {
        type: SET_VIEW,
        view: ERROR_VIEW
    }
};
