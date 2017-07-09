import {connect} from "react-redux";
import {DisplayName} from "./DisplayName";

const mapStateToProps = (state, ownProps) => {
    return {
        name: state.name
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const NameInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayName);

export default NameInputContainer
