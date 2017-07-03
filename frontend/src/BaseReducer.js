import {combineReducers} from "redux";
import {name} from "./NameInput/Reducers";
import {view} from "./ViewSelection/Reducers";
import {joinRoom} from "./JoinRoom/Reducers";
import {room} from "./Lobby/Reducers";
import {error} from "./Error/Reducers";

export const merlinApp = combineReducers({
    name,
    view,
    joinRoom,
    asd: (state = {}, action) => {
        console.log("Event:", action.type);
        return state;
    },
    room,
    error
});
