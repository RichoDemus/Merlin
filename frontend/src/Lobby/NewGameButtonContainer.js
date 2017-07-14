import {connect} from "react-redux";
import {NewGameButton} from "./NewGameButton";
import {gotoLoadingView} from "../ViewSelection/Actions";
import {newGame} from "./Actions";

const mapStateToProps = (state, ownProps) => {
    return {}
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
