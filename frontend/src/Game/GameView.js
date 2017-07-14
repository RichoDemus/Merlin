import React from "react";
import DisplayRoleContainer from "./DisplayRoleContainer";
import BackToLobbyButtonContainer from "./BackToLobbyButtonContainer";

const GameView = () => (
    <div className="GameView">
        <DisplayRoleContainer/>
        <BackToLobbyButtonContainer/>
    </div>
);

export default GameView
