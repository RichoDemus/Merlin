import {combineReducers} from "redux";
import {name} from "./NameInput/Reducers";
import {page} from "./LayoutSelection/Reducers";

export const merlinApp = combineReducers({
    name,
    page
});
