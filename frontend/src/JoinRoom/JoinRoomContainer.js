import {connect} from "react-redux";
import {JoinRoom} from "./JoinRoom";
import {joinRoom} from "./Actions";
import {gotoLoadingView} from "../ViewSelection/Actions";

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onJoinButtonClick: (event) => {
            const roomNumber = event.target.previousElementSibling.value;
            dispatch(joinRoom(roomNumber));
            dispatch(gotoLoadingView());
        },
        onKeyEnter: (event) => {
            if (event.key === "Enter") {
                const roomNumber = event.target.value;
                dispatch(joinRoom(roomNumber));
                dispatch(gotoLoadingView());
            }
        }
    }
};

const JoinRoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinRoom);

export default JoinRoomContainer
