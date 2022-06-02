import { BsImage } from "react-icons/bs"
import { Camera, CameraResultType } from '@capacitor/camera';
import Props from "./props"

import "./styles.css";

function ImagePick(props: Props) {
    
	const { onChange } = props.events;

    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          resultType: CameraResultType.DataUrl
        });
  
        if(onChange) onChange(image.dataUrl!)
    };

  return (
    <>
        {!props.initialValue ? (
            <div className={`container-img-pick flex justify-center items-center flex-none ${props.cssClass}`} onClick={() => props.disabled || takePicture()}>
                <div className="image-pick flex flex-col justify-evenly items-center text-white">
                <BsImage size={40}/>
                <div className="text-2xl text-center">Adicione uma imagem</div>
                </div>
            </div>
            )
            :
            (
            <img
            className={`container-img-pick ${props.cssClass}`}
            onClick={() => takePicture()}
            src={props.initialValue}
            alt="" />
        )}
    </>
  )
}

export default ImagePick;