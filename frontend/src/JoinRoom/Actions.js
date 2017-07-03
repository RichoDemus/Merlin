export const JOIN_ROOM = "JOIN_ROOM";
export const CREATE_ROOM = "CREATE_ROOM";

export const joinRoom = roomNumber => {
    return {
        type: JOIN_ROOM,
        roomNumber
    }
};

export const createRoom = () => {
    return {
        type: CREATE_ROOM
    }
};
