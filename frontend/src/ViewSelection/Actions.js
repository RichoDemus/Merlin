export const SET_VIEW = "SET_VIEW";
export const NAME_INPUT_VIEW = "NAME_INPUT_VIEW";
export const JOIN_ROOM_VIEW = "JOIN_ROOM_VIEW";

export const gotoJoinRoomView = () => {
    return {
        type: SET_VIEW,
        view: JOIN_ROOM_VIEW
    }
};
