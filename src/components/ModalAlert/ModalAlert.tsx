import Template from '../Template'
import Button from '../Button'
import Modal from 'react-modal'

import Props from './props'
import { IoClose } from 'react-icons/io5'

const ModalAlert = (props : Props) => {
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
        renderHeader={
            <IoClose
            color={props.color} 
            size={40}
            onClick={() => props.closeModal()}/>
          }
        classCssHeader={"flex !justify-end"}
        renderBody={
            <div className='flex flex-col justify-between'>
                <div className='flex h-15 justify-center text-center'>
                    {props.type == "cronog" && "Parece que você não terminou de preencher seu ultimo Cronog, deseja continuar?"}
                    {props.type == "task" && "Parece que você não terminou de preencher sua ultima tarefa, deseja continuar?"}
                </div>
                <div className='flex justify-around'>
                    <Button 
                    classCss='h-10 !bg-white'
                    borderColor={props.color}
                    textColor={props.color}
                    action={props.actionDecline}>
                        CRIAR NOVO
                    </Button>
                    <Button 
                    backgroundColor={props.color}
                    borderColor={props.color}
                    textColor={"white"}
                    action={props.actionConfirm}>
                        CONTINUAR
                    </Button>
                </div>
            </div>
        }
        />
  </Modal>
  )
}

export default ModalAlert