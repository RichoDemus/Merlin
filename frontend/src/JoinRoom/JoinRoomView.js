import React from "react";
import DisplayNameContainer from "../common/displayname/DisplayNameContainer";
import CreateRoomContainer from "./CreateRoomContainer";
import JoinRoomContainer from "./JoinRoomContainer";
import ChangeNameButtonContainer from "./ChangeNameButtonContainer";

const JoinRoomView = () => (
    <div className="JoinRoom">
        <DisplayNameContainer/>
        <JoinRoomContainer/>
        <CreateRoomContainer/>
        <ChangeNameButtonContainer/>
    </div>
);

export default JoinRoomView
