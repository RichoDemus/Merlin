export const SET_PAGE = "SET_PAGE";
export const NAME_INPUT_PAGE = "NAME_INPUT_PAGE";
export const JOCR_PAGE = "JOCR_PAGE";

export const gotoJoCRPage = () => {
    return {
        type: SET_PAGE,
        page: JOCR_PAGE
    }
};