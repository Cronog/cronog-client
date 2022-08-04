import Modal from "react-modal";

import "./styles.css"
import Props from './props';
import { useEffect, useState } from "react";
import { getColors } from "../../utils/color";
import { Color } from "../../types/Color";
import Template from "../Template";
import { IoClose } from "react-icons/io5";

const ModalSelectionColor = (props : Props) => {

    const [colors, setColors] = useState<Color[] | undefined>([])

    function selectColor(color : string) {
        props.onSelected(color)
        props.closeModal()
    }

    useEffect(() => {
        getColors().then(data => data.success ? setColors(data.data) : [])
    }, [])

  return (
    <Modal
        isOpen={props.showModal}
      >
        <Template
       renderHeader={
        <IoClose 
        color={"black"} 
        size={40}
        onClick={() => props.closeModal()}
        />
        }
        classCssHeader={"flex !justify-end"}
        colorHeader={"white"}
        hideMenuHamburguer
        renderBody={
          <div className="flex flex-wrap justify-between p-3 items-center h-full overflow-x-auto">
              {colors?.map(item => 
              <div 
              className="item-color rounded-md flex flex-col"
              onClick={() => selectColor(item.code)}
              >
                  <div className="w-full h-full rounded-md" style={{backgroundColor: item.code}}></div>
                  <div className="text-center">{item.name}</div>
              </div>)}
          </div>
        }
       />
      </Modal>
  )
}

export default ModalSelectionColor