import Template from '../Template'
import Button from '../Button'
import Modal from 'react-modal'

import Props from './props'

const ModalConfirm = (props : Props) => {
  return (
    <Modal
    style={{
        content: {
            maxHeight: "220px",
            minHeight: "150px"
        }
    }}
    isOpen={props.showModal}
    >
        <Template 
        hideMenuHamburguer
        colorHeader="white"
        classCssBody='flex overflow-y-auto flex-wrap justify-between'
        renderBody={
            <div className='flex flex-col justify-between'>
                <div className='flex h-15 justify-center text-center'>
                    {props.text}
                </div>
                <div className='flex justify-around'>
                    <Button 
                    classCss='h-10 !bg-white'
                    borderColor={props.color}
                    textColor={props.color}
                    action={props.closeModal}>
                        CANCELAR
                    </Button>
                    <Button 
                    backgroundColor={props.color}
                    borderColor={props.color}
                    textColor={"white"}
                    action={props.actionConfirm}>
                        CONFIRMAR
                    </Button>
                </div>
            </div>
        }
        />
  </Modal>
  )
}

export default ModalConfirm