import { IoClose } from "react-icons/io5";

import * as authUtils from "../../utils/auth";

import "./styles.css";

const Menu = () => {

  const closeMenu = () => {
    const element = document.getElementById("container-menu");
    if(element){
      element.style.width = "0";
      element.style.right = "-300px";
      element.style.padding = "0"
    }
  }

  return (
        <div id="container-menu">
          <div className="flex justify-end mb-5">
                <IoClose 
                size={40}
                onClick={closeMenu}
                />
          </div>
            <a className="flex" href="/home" onClick={closeMenu} >
                Home
            </a>
            <a className="flex" href="/auth/login" onClick={() => authUtils.singOut(closeMenu())}>
                Sair
            </a>
        </div>
  )
}

export default Menu