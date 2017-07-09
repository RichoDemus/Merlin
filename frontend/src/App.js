import React from "react";
import "./App.css";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {merlinApp} from "./BaseReducer";
import SelectViewContainer from "./ViewSelection/SelectViewContainer";
import WebsocketMiddleware from "./Networking/WebsocketMiddleware";

const logger = store => next => action => {
    console.group("Action:", action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result
};

const store = createStore(
    merlinApp,
    applyMiddleware(logger, thunk, WebsocketMiddleware)
);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <SelectViewContainer/>
        </div>
    </Provider>
);

export default App;
