import {connect} from "react-redux";
import {ListUsers} from "./ListUsers";

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.room.users
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const ListUsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUsers);

export default ListUsersContainer
