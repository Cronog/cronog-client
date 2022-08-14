

import { Keyboard } from "@capacitor/keyboard";
import { useState } from "react";
import BackButton from "../BackButton";
import HamburguerMenu from "../HamburguerMenu";
import Props from "./props";

import "./styles.css";

const Template = (props : Props) => {

  const [sizeKeyboard, setSizeKeyboard] = useState<number>(0);

  Keyboard.addListener("keyboardWillShow", info => {
    setSizeKeyboard(info.keyboardHeight); 
  })

  Keyboard.addListener("keyboardWillHide", () => {
    setSizeKeyboard(0);
  })

  return (
      <div id="container-template" className={`container-template ${props.classCssScreen}`}
      style={{
        "--color-container": props.colorContainer || "white"
      } as React.CSSProperties}
      >
        <div className={`header-template ${props.classCssHeader}`}
        style={{
          "--color-header": props.colorHeader || "var(--main-color)"
        } as React.CSSProperties}>
            {props.pathBack ? <BackButton path={props.pathBack} actionClick={props.backAction} color="white"/> : <></>}
            {props.renderHeader ? props.renderHeader : <></>}
            {props.hideMenuHamburguer ? <></> : <HamburguerMenu color={props.colorMenuHamburguer} /> }
        </div>
        <div className={`body-template`}
        style={{
          overflowY: sizeKeyboard > 0 ? 'auto' : 'hidden'
        }}>
          <div className={`content ${props.classCssBody}`}
          style={{
            "--color-body": props.colorBody || "white"
          } as React.CSSProperties}>
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