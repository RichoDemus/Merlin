import {NAME_INPUT_VIEW, SET_VIEW} from "./Actions";

export const view = (state = NAME_INPUT_VIEW, action) => {
    switch (action.type) {
        case SET_VIEW:
            return action.view;
    }
    return state;
};