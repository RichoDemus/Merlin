import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import { merlinApp } from "./BaseReducer";
import SelectViewContainer from "./ViewSelection/SelectViewContainer";
import WebsocketMiddleware from "./Networking/WebsocketMiddleware";

const store = createStore(
    merlinApp,
    applyMiddleware(thunk, WebsocketMiddleware)
);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <SelectViewContainer/>
        </div>
    </Provider>
);

export default App;
