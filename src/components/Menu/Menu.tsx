import { IoClose } from "react-icons/io5";

import * as authUtils from "../../utils/auth";

import "./styles.css";

const Menu = () => {

  const closeMenu = () => {
    const element = document.getElementById("container-menu");
    if(element)
      element.style.display = "none";
  }

  return (
        <div id="container-menu">
          <div className="flex justify-end mb-5">
            <IoClose 
            size={40}
            onClick={closeMenu}
            />
          </div>
            <a href="/home" onClick={closeMenu} >
                Home
            </a>
            <a href="/auth/login" onClick={() => authUtils.singOut(closeMenu())}>
                Sair
            </a>
        </div>
  )
}

export default Menu