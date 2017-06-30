import {NAME_INPUT_PAGE, SET_PAGE} from "./Actions";

export const page = (state = NAME_INPUT_PAGE, action) => {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
    }
    return state;
};