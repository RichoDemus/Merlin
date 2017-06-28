import React, {Component} from "react";
import "./App.css";
import FetchFromBackend from "./components/FetchFromBackend";

class App extends Component {
    render() {
        return (
            <div className="App">
                <FetchFromBackend/>
            </div>
        );
    }
}

export default App;
