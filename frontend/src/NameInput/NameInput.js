import React from "react";

export const NameInput = ({onGoButtonClick, onKeyEnter}) => (
    <div>
        <input type="text" placeholder="Your name" onKeyPress={onKeyEnter}/>
        <button onClick={onGoButtonClick}>Go!</button>
    </div>
);
