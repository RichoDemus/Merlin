import React from "react";
import {ERROR_VIEW, GAME_VIEW, JOIN_ROOM_VIEW, LOADING_VIEW, LOBBY_VIEW} from "./Actions";
import JoinRoomView from "../JoinRoom/JoinRoomView";
import NameInputView from "../NameInput/NameInputView";
import LoadingView from "../Loading/LoadingView";
import LobbyView from "../Lobby/LobbyView";
import ErrorView from "../Error/ErrorView";
import GameView from "../Game/GameView";

export const SelectView = ({view}) => (
    <div>
        { (() => {
            switch (view) {
                case JOIN_ROOM_VIEW:
                    return <JoinRoomView/>;
                case LOADING_VIEW:
                    return <LoadingView/>;
                case LOBBY_VIEW:
                    return <LobbyView/>;
                case ERROR_VIEW:
                    return <ErrorView/>;
                case GAME_VIEW:
                    return <GameView/>;
                default:
                    return <NameInputView/>;
            }
        })()}
    </div>
);
