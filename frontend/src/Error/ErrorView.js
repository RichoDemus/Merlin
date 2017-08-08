import React from "react";
import ErrorMessageContainer from "./ErrorMessageContainer";
import LeaveRoomButtonContainer from "../common/LeaveRoomButton/LeaveRoomButtonContainer";

const ErrorView = () => (
    <div className="Error">
        <p>Error!</p>
        <ErrorMessageContainer/>
        <LeaveRoomButtonContainer/>
    </div>
);

export default ErrorView
