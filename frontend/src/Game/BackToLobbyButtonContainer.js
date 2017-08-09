import {connect} from "react-redux";
import {gotoLoadingView} from "../ViewSelection/Actions";
import {endGame} from "./Actions";
import {BackToLobbyButton} from "./BackToLobbyButton";

const mapStateToProps = (state, ownProps) => {
    return {
        // buttonDisabled: !state.room.host
        buttonDisabled: false
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        backToLobby: (event) => {
            dispatch(gotoLoadingView());
            dispatch(endGame());
        }
    }
};

const BackToLobbyButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BackToLobbyButton);

export default BackToLobbyButtonContainer;
