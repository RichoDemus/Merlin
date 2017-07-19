import {connect} from "react-redux";
import {NewGameButton} from "./NewGameButton";
import {gotoLoadingView} from "../ViewSelection/Actions";
import {newGame} from "./Actions";

const mapStateToProps = (state, ownProps) => {
    return {
        buttonDisabled: !state.room.host || state.room.users.length < 5
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        newGameClick: (event) => {
            dispatch(gotoLoadingView());
            dispatch(newGame());
        }
    }
};

const NewGameButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewGameButton);

export default NewGameButtonContainer;
