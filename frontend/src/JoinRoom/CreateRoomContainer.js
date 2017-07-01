import {connect} from "react-redux";
import {CreateRoom} from "./CreateRoom";
import {createRoom} from "./Actions";

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreateButtonClick: (event) => {
            dispatch(createRoom());
        }
    }
};

const CreateRoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRoom);

export default CreateRoomContainer
