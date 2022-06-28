import Modal from "react-modal";

import Template from "../Template";
import { IoClose } from "react-icons/io5";

import Props from './props';
import "./styles.css"

const ModalImagePreview = (props : Props) => {

  return (
    <Modal
        isOpen={props.showModal}
        style={{
          content:{
            maxHeight: "fit-content",
          },
        }}
      >
       <Template 
       renderHeader={
        <IoClose 
        color={props.color} 
        size={40}
        onClick={() => props.closeModal()}/>
      }
      classCssHeader={"flex !justify-end"}
       colorHeader={"white"}
       hideMenuHamburguer
       renderBody={
        <img
          className={`w-full h-full object-contain`}
          src={props.image}
          alt="" /> 
       }
       />
      </Modal>
  )
}

export default ModalImagePreview