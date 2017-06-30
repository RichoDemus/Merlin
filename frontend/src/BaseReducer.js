import {combineReducers} from "redux";
import {name} from "./NameInput/Reducers";
import {view} from "./ViewSelection/Reducers";

export const merlinApp = combineReducers({
    name,
    view
});
