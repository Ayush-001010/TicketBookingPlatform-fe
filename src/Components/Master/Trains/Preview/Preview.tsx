import React, { useContext, useEffect , useState } from "react";
import IPreview from "./IPreview";
import { StepProps, Steps } from "antd";
import useAddTrainFunc from "../../../../hooks/useAddTrainFunc";
import styles from "./Preview.module.css";
import { AddTrainContext } from "../AddTrains";

const Preview: React.FunctionComponent<IPreview> = () => {
  const { genratingPreview } = useAddTrainFunc();
  const [previewItems, setPreviewItems] = useState<Array<StepProps>>([]);
  const { formType } = useContext(AddTrainContext)
  useEffect(() => {
    const res= genratingPreview();
    res.map((ele:StepProps) => {
      ele.icon =  <i className="bi bi-info-circle"></i> 
      ele.title = <div style={{width : "0% !important"}}/>
      return ele;
    });
    setPreviewItems(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Steps className={styles.css1} direction="vertical" current={formType - 1} items={previewItems} />
    </>
  );
};

export default Preview;
