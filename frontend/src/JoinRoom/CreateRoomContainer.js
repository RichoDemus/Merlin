import {connect} from "react-redux";
import {CreateRoom} from "./CreateRoom";

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

const CreateRoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRoom);

export default CreateRoomContainer
