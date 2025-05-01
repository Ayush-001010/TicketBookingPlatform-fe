import React from "react";
import IModalForm from "./IModalForm";
import { Modal } from "antd";
import Form from "../../Form/Form";
import { IFormTypes } from "../../../Service/Form/formConfig";
import styles from "./ModalForm.module.css";

const ModalForm: React.FunctionComponent<IModalForm> = ({ open, onCloseFunc, formType, formtitle, initialValues, formOptions, gettingValuesFromForm , headerCssClassName }) => {

    return (
        <Modal open={open} onCancel={onCloseFunc} footer={null}>
            <Form formCSSClassName="css2" formType={formType as keyof IFormTypes} formtitle={formtitle} button1Text="Submit" intialValue={initialValues} option={formOptions} passingeValueToParent={gettingValuesFromForm} headerCssClassName={headerCssClassName} >
                <Form.Title />
            </Form>
        </Modal>
    )
};

export default ModalForm;