import React from "react";

export const BackToLobbyButton = ({buttonDisabled, backToLobby}) => (
    <div>
        <button onClick={ backToLobby } disabled={buttonDisabled}>Back to Lobby</button>
    </div>
);
