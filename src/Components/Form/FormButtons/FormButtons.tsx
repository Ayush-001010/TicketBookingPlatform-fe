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
  console.log("BTN2 ",btn2);
  return (
    <div className={styles[`${className || "css1"}`]}>
      <ButtonUI type={ !btn2 || btn2.length === 0 ? "submit": "button" }>
        <Text>{btn1}</Text>
      </ButtonUI>
      { btn2 && btn2.length > 0 && <ButtonUI type="submit">
        <Text>{btn2}</Text>
      </ButtonUI>
      }
    </div>
  );
};

export default FormButtons;
