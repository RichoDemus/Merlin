export const JOIN_ROOM = "JOIN_ROOM";

export const joinRoom = roomNumber => {
    return {
        type: JOIN_ROOM,
        roomNumber
    }
};
