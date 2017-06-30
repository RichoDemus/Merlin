import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { merlinApp } from "./BaseReducer";
import SelectViewContainer from "./ViewSelection/SelectViewContainer";

let store = createStore(merlinApp);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <SelectViewContainer/>
        </div>
    </Provider>
);

export default App;
