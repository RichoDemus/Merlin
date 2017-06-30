import React from "react";
import {JOIN_ROOM_VIEW} from "./Actions";
import JoinRoomView from "../JoinRoom/JoinRoomView";
import NameInputView from "../NameInput/NameInputView";

export const SelectView = ({ view }) => (
    <div>
        { (() => {
            switch(view) {
                case JOIN_ROOM_VIEW:
                    return <JoinRoomView/>;
                default:
                    return <NameInputView/>;
            }
        })()}
    </div>
);
