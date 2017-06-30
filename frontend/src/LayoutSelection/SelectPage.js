import React from "react";
import {JOCR_PAGE} from "./Actions";
import NameInputLayout from "../NameInput/NameInputLayout";
import JoCRLayout from "../JoinOrCreateRoom/JoCRLayout";

export const SelectPage = ({ page }) => (
    <div>
        { (() => {
            console.log("Page is ", page);
            switch(page) {
                case JOCR_PAGE:
                    return <JoCRLayout/>;
                default:
                    return <NameInputLayout/>;
            }
        })()}
    </div>
);
