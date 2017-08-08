import {connect} from "react-redux";
import {gotoNameInputView} from "../ViewSelection/Actions";
import {ChangeNameButton} from "./ChangeNameButton";

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (event) => {
            dispatch(gotoNameInputView());
        }
    }
};

const ChangeNameButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeNameButton);

export default ChangeNameButtonContainer
