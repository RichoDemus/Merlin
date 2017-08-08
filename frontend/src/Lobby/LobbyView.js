import React from "react";
import DisplayNameContainer from "../common/displayname/DisplayNameContainer";
import ListUsersContainer from "./ListUsersContainer";
import RoomNumberContainer from "./RoomNumberContainer";
import NewGameButtonContainer from "./NewGameButtonContainer";
import LeaveRoomButtonContainer from "./LeaveRoomButtonContainer";

const LobbyView = () => (
    <div className="Lobby">
        <p>Lobby!</p>
        <RoomNumberContainer/>
        <DisplayNameContainer/>
        <NewGameButtonContainer/>
        <LeaveRoomButtonContainer/>
        <ListUsersContainer/>
    </div>
);

export default LobbyView
