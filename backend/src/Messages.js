export const playerJoined = player => {
    return {
        type: "PLAYER_JOINED",
        player
    };
};

export const playerLeft = player => {
    return {
        type: "PLAYER_LEFT",
        player
    };
};
