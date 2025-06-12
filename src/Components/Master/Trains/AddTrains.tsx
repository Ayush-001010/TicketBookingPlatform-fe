import React, { createContext, useState } from "react";
import IAddTrains from "./IAddTrains";
import SideNotes from "../../UIComponent/Cards/SideNotes/SideNotes";
import AddTrainConfig from "../../../Service/Config/AddTrainConfig";
import Description from "./Notes/Description";
import styles from "./AddTrains.module.css";
import TrainForm from "./TrainForm/TrainForm";
import RightSidePreview from "../../UIComponent/Cards/RightSidePreview/RightSidePreview";
import Preview from "./Preview/Preview";
import useAddTrainFunc from "../../../hooks/useAddTrainFunc";
import { ITrainDetails } from "../../../Service/Interface/AddTrainInterface";
import AfterSubmitPopup from "../../UIComponent/Popup/AfterSubmitPopup/AfterSubmitPopup";
import { useNavigate } from "react-router-dom";

interface IAddTrainContext {
  formType: number;
}

export const AddTrainContext = createContext<IAddTrainContext>({ formType: 1 });


const AddTrains: React.FunctionComponent<IAddTrains> = () => {
  const { addNewTrain } = useAddTrainFunc();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
    setOpen(false);
    
  }
  const addNewTrainHandler = async (value: ITrainDetails) => {
    const response = await addNewTrain(value);
    if (response.success) {
      setOpen(true);
    }
  }
  const [formType, setFormType] = useState<number>(1);
  const changeFormType = (newValue: number) => {
    setFormType(newValue);
  }
  return (
    <AddTrainContext.Provider value={{ formType }}>
      <div className={styles.css2}>
        <div className={styles.css3}>
          <h1>{AddTrainConfig.title}</h1>
        </div>
        <div className={styles.css1}>
          <SideNotes>
            <Description />
          </SideNotes>
          <TrainForm changeFormType={changeFormType} submitHanlder={addNewTrainHandler} />
          <RightSidePreview>
            <Preview />
          </RightSidePreview>
        </div>
      </div>
      <AfterSubmitPopup open={open} decisionFunc={closeModal} popupType="Success" />
    </AddTrainContext.Provider>
  );
};

export default AddTrains;
