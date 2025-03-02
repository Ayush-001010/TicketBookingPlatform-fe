import React from "react";
import ButtonUI from "../../UIComponent/Button/ButtonUI";
import Text from "../../UIComponent/Text/Text";
import IFormButton from "./IFormButton";
import styles from "./FormButtons.module.css";

const FormButtons: React.FunctionComponent<IFormButton> = ({
  btn1,
  btn2,
  className,
}) => {
  return (
    <div className={styles[`${className || "css1"}`]}>
      <ButtonUI type="button">
        <Text>{btn1}</Text>
      </ButtonUI>
      { btn2 && <ButtonUI type="submit">
        <Text>{btn2}</Text>
      </ButtonUI>
      }
    </div>
  );
};

export default FormButtons;
