

import { Keyboard } from "@capacitor/keyboard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HamburguerMenu from "../HamburguerMenu";
import Props from "./props";

import "./styles.css";

const Template = (props : Props) => {

  const [sizeKeyboard, setSizeKeyboard] = useState<number>(0);

  const history = useHistory();

  Keyboard.addListener("keyboardWillShow", info => {
    setSizeKeyboard(info.keyboardHeight); 
  })

  Keyboard.addListener("keyboardWillHide", () => {
    setSizeKeyboard(0);
  })

  return (
      <div id="container-template" className={`container-template ${props.styleScreen}`}>
        <div className={`header-template ${props.styleHeader}`}>
            {props.renderHeader ? props.renderHeader : <></>}
            {history.location.pathname.indexOf("/auth") == -1 ? <HamburguerMenu color={props.colorMenuHamburguer} /> : <></> }
        </div>
        <div className={`body-template`}
        style={{
          overflowY: sizeKeyboard > 0 ? 'auto' : 'hidden'
        }}>
          <div className={`content ${props.styleBody}`}>
            {props.renderBody}
          </div>
          <div className="keyboard"
            style={{
              height: `${sizeKeyboard}px`
            }}
            >
          </div>
        </div>
      </div>
  )
}

export default Template