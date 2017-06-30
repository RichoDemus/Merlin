import {connect} from "react-redux";
import {SelectPage} from "./SelectPage";

const mapStateToProps = (state, ownProps) => {
    return {
        page: state.page
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

const SelectPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPage);

export default SelectPageContainer
