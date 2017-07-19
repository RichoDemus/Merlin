import React from "react";

export const NewGameButton = ({buttonDisabled, newGameClick}) => (
    <div>
        <button onClick={newGameClick} disabled={buttonDisabled}>New Game</button>
    </div>
);
