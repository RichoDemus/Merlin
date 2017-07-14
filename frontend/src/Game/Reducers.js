import {NEW_GAME} from "../Networking/Actions";
export const game = (state = "", action) => {
    switch (action.type) {
        case NEW_GAME:
            return {
                role: action.role,
                friends: action.friends
            };
        default:
            return state;
    }
};
