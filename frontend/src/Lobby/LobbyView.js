import React from "react";
import DisplayNameContainer from "../common/displayname/DisplayNameContainer";
import ListUsersContainer from "./ListUsersContainer";
import RoomNumberContainer from "./RoomNumberContainer";
import NewGameButtonContainer from "./NewGameButtonContainer";

const LobbyView = () => (
    <div className="Lobby">
        <p>Lobby!</p>
        <RoomNumberContainer/>
        <DisplayNameContainer/>
        <NewGameButtonContainer/>
        <ListUsersContainer/>
    </div>
);

export default LobbyView
