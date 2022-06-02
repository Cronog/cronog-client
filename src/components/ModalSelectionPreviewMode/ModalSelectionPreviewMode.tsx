import Modal from "react-modal";

import "./styles.css"
import Props from './props';
import Button from "../Button";

const ModalSelectionPreviewMode = (props : Props) => {

    function selectMode(mode : number) {
        props.onSelected(mode)
        props.closeModal()
    }

  return (
    <Modal
        isOpen={props.showModal}
        style={{
            content:{
                maxHeight: "220px"
            }
        }}
      >
        <div className="h-full flex flex-col justify-between p-5 items-center">
            <Button
            backgroundColor={props.color}
            classCss="w-full"
            action={() => selectMode(0)}
            >
                LISTA
            </Button> 
            <Button
            backgroundColor={props.color}
            classCss="w-full"
            action={() => selectMode(1)}
            >
                SLIDE
            </Button> 
            <Button
            backgroundColor={props.color}
            classCss="w-full"
            action={() => selectMode(2)}
            >
                LISTA PRIMEIRO E ULTIMO
            </Button> 
            <Button
            backgroundColor={props.color}
            classCss="w-full"
            action={() => selectMode(3)}
            >
                SLIDE PRIMEIRO E ULTIMO
            </Button>
        </div>
      </Modal>
  )
}

export default ModalSelectionPreviewMode