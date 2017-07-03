import React from "react";
import DisplayNameContainer from "../common/displayname/DisplayNameContainer";
import ListUsersContainer from "./ListUsersContainer";
import RoomNumberContainer from "./RoomNumberContainer";

const LobbyView = () => (
    <div className="Lobby">
        <p>Lobby!</p>
        <RoomNumberContainer/>
        <DisplayNameContainer/>
        <ListUsersContainer/>
    </div>
);

export default LobbyView
