import React from "react";

export const JoinRoom = ({onJoinButtonClick, onKeyEnter}) => (
    <div>
        <input type="text" placeholder="Room number" onKeyPress={ onKeyEnter }/>
        <button onClick={ onJoinButtonClick }>Join Room</button>
    </div>
);
