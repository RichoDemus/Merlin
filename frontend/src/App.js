import React from "react";
import "./App.css";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {merlinApp} from "./BaseReducer";
import SelectViewContainer from "./ViewSelection/SelectViewContainer";
import WebsocketMiddleware from "./Networking/WebsocketMiddleware";
import persistState from 'redux-localstorage'
import {JOIN_ROOM} from "./JoinRoom/Actions";
import {gotoJoinRoomView, NAME_INPUT_VIEW, SET_VIEW} from "./ViewSelection/Actions";
import {setName} from "./NameInput/Actions";

// Node doesn't support these so tests fail...
if (!console["group"]) console["group"] = function() {};
if (!console["groupCollapsed"]) console["groupCollapsed"] = function() {};
if (!console["groupEnd"]) console["groupEnd"] = function() {};

const logger = store => next => action => {
    console.group("Action:", action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result
};

const enhancer = compose(
    applyMiddleware(logger, WebsocketMiddleware),
    persistState(["name", "roomNumber"])
);

const store = createStore(
    merlinApp,
    enhancer
);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <SelectViewContainer/>
        </div>
    </Provider>
);

// This is here to actually trigger the init stuff
// I have no idea where to put this :(
const init = () => {
    const roomNumber = store.getState().roomNumber;
    const name = store.getState().name;

    if(!name) {
        store.dispatch({
            type: SET_VIEW,
            view: NAME_INPUT_VIEW
        });
        return;
    }

    store.dispatch(setName(name));
    store.dispatch(gotoJoinRoomView());

    if(roomNumber) {
        store.dispatch({
            type: JOIN_ROOM,
            roomNumber: store.getState().roomNumber
        });
    }
};
init();

export default App;
