import React from "react";
import IAddTrains from "./IAddTrains";
import SideNotes from "../../UIComponent/Cards/SideNotes/SideNotes";
import AddTrainConfig from "../../../Service/Config/AddTrainConfig";
import FirstDescription from "./Notes/FirstDescription";
import styles from "./AddTrains.module.css";
import TrainForm from "./TrainForm/TrainForm";
import RightSidePreview from "../../UIComponent/Cards/RightSidePreview/RightSidePreview";
import Preview from "./Preview/Preview";

const AddTrains: React.FunctionComponent<IAddTrains> = () => {
  return (
    <div className={styles.css2}>
      <div>
        <h1>{AddTrainConfig.title}</h1>
      </div>
      <div className={styles.css1}>
        <SideNotes>
          <FirstDescription />
        </SideNotes>
        <TrainForm />
        <RightSidePreview>
          <Preview />
        </RightSidePreview>
      </div>
    </div>
  );
};

export default AddTrains;
