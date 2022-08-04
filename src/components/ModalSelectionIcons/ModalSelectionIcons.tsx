import Modal from "react-modal";
import Template from '../Template';

import { IoClose } from "react-icons/io5";
import icons from "../../utils/icons";

import "./styles.css"
import Props from './props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const ModalSelectionIcons = (props : Props) => {

    function selectIcon(icon : IconDefinition) {
        props.onSelected(icon)
        props.closeModal()
    }

  return (
    <Modal
        isOpen={props.showModal}
      >
          <Template 
          hideMenuHamburguer
          classCssHeader="ml-auto text-5xl !p-5"
          renderHeader={
            <IoClose 
            color={"black"} 
            size={40}
            onClick={() => props.closeModal()}
            />
          }
          colorHeader="white"
          classCssBody='flex overflow-y-auto flex-wrap justify-between'
          renderBody={
              <>
                {icons.map(icon=> (
                    <FontAwesomeIcon
                    onClick={() => selectIcon(icon)}
                    style={{
                        height: "60px",
                        width: "30%",
                        marginBottom: "20px",
                    }}
                    id={icon.iconName} 
                    icon={icon} />
                ))}
            </>
          }
          />
      </Modal>
  )
}

export default ModalSelectionIcons