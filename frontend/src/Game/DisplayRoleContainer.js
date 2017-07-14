import {connect} from "react-redux";
import {DisplayRole} from "./DisplayRole";

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.game.role,
        friends: state.game.friends
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const DisplayRoleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRole);

export default DisplayRoleContainer
