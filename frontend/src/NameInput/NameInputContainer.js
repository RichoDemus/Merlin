import {connect} from "react-redux";
import {NameInput} from "./NameInput";
import {setName} from "./Actions";
import {gotoJoCRPage} from "../LayoutSelection/Actions";

const mapStateToProps = (state, ownProps) => {
    return {
        // name: state.name
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGoButtonClick: (event) => {
            const nameInput = event.target.previousElementSibling;
            dispatch(setName(nameInput.value));
            dispatch(gotoJoCRPage());
        },
        onKeyEnter: (event) => {
            if (event.key === "Enter") {
                const nameInput = event.target;
                dispatch(setName(nameInput.value));
                dispatch(gotoJoCRPage());
            }
        }
    }
};

const NameInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NameInput);

export default NameInputContainer
