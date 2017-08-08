export const START_NEW_GAME = "START_NEW_GAME";
export const LEAVE_ROOM = "LEAVE_ROOM";

export const newGame = () => {
    return {
        type: START_NEW_GAME
    }
};

export const leaveRoom = () => {
    return {
        type: LEAVE_ROOM
    }
};
