import React from "react";
import IPopup from "../IPop.up";
import { Modal } from "antd";

const AfterSubmitPopup  : React.FunctionComponent<IPopup> = ({ open , popupType , decisionFunc , message}) => {
    return (
        <Modal open={open} onCancel={() => decisionFunc()} footer={[]}>
            <div>
                <div>
                    {popupType === "Success" ? <i className="bi bi-check-circle" />: <i className="bi bi-emoji-frown"/> }
                </div>
                <div>
                    {popupType === "Success" ? <h2>Successfully Action Take</h2> : <h2>Something Went Wrong</h2>}
                </div>
                <div>
                    <p>{message}</p>
                </div>
                <div>
                    <button onClick={() => decisionFunc()} >
                        {popupType === "Success" ? "Close" : "Try Again"}
                    </button>
                </div>
            </div>            
        </Modal>
    )
}

export default AfterSubmitPopup;