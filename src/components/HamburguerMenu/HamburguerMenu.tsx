import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { showToast } from "../Toast/Toast";
import Props from "./props";

import "./styles.css";

function HamburguerMenu(props : Props) {
    const showMenu = () => {
        const element = document.getElementById("container-menu");
        if(element){
             element.style.width = "70%"
             element.style.padding = "10px"
        }
    }

  return (
      <>
        <div>
        <input type="checkbox" id="menu" hidden={true} />
            <label htmlFor="menu">
                <GiHamburgerMenu 
                size={30}
                style={{
                    color: props.color || "black"
                }}
                onClick={() => showMenu()}
                />
            </label>
        </div>
      </>
  )
}

export default HamburguerMenu