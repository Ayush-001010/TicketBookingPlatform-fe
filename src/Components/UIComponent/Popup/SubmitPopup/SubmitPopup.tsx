import React from "react";
import IPopup from "../IPop.up";
import { Modal } from "antd";

const SubmitPopup  : React.FunctionComponent<IPopup> = ({open , decisionFunc , message}) => {
    return (
        <Modal open={open} onCancel={() => decisionFunc("cancel")} footer={[]}>
            <div>
                <i className="bi bi-exclamation-circle"></i>
            </div>
            <div>
                <h1>Are You Sure?</h1>
                <p>{message} This action cannot be undone.</p>
            </div>
            <div>
                <button onClick={() => decisionFunc("submit")}>Yes, Submit</button>
                <button onClick={() => decisionFunc("cancel")}>Cancel</button>
            </div>
        </Modal>
    )
};

export default SubmitPopup;