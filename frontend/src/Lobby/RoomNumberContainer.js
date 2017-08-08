import {connect} from "react-redux";
import {RoomNumber} from "./RoomNumber";

const mapStateToProps = (state, ownProps) => {
    return {
        number: state.roomNumber
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const RoomNumberContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomNumber);

export default RoomNumberContainer
