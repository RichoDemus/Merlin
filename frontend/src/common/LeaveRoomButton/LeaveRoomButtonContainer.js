import {connect} from "react-redux";
import {LeaveRoomButton} from "./LeaveRoomButton";
import {gotoJoinRoomView} from "../../ViewSelection/Actions";
import {leaveRoom} from "../../Lobby/Actions";

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (event) => {
            dispatch(leaveRoom());
            dispatch(gotoJoinRoomView());
        }
    }
};

const ChangeNameButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaveRoomButton);

export default ChangeNameButtonContainer
