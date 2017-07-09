import {connect} from "react-redux";
import {ErrorMessage} from "./ErrorMessage";

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const ErrorMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorMessage);

export default ErrorMessageContainer
