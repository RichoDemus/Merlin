import {combineReducers} from "redux";
import {name} from "./NameInput/Reducers";
import {view} from "./ViewSelection/Reducers";
import {joinRoom} from "./JoinRoom/Reducers";

export const merlinApp = combineReducers({
    name,
    view,
    joinRoom
});
