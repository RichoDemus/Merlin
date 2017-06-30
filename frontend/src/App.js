import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { merlinApp } from "./BaseReducer";
import SelectPageContainer from "./LayoutSelection/SelectPageContainer";

let store = createStore(merlinApp);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <SelectPageContainer/>
        </div>
    </Provider>
);

export default App;
