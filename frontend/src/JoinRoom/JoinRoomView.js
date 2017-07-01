import React from "react";
import DisplayNameContainer from "./DisplayNameContainer";
import CreateRoomContainer from "./CreateRoomContainer";
import JoinRoomContainer from "./JoinRoomContainer";

const JoinRoomView = () => (
    <div className="JoinRoom">
        <DisplayNameContainer/>
        <JoinRoomContainer/>
        <CreateRoomContainer/>
    </div>
);

export default JoinRoomView
