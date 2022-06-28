import { BsImage } from "react-icons/bs"
import { Camera, CameraResultType } from '@capacitor/camera';
import Props from "./props"

import "./styles.css";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function ImagePick(props: Props) {
  
  const imageLimit = 3;

  const [images, setImages] = useState<string[]>([]);
  
  const { onChange } = props.events;

  useEffect(() => {
    if(props.initialValue?.length)
      setImages(props.initialValue)
  }, props.initialValue)

  useEffect(() => {
    if(onChange) onChange(images)

    let container = document.querySelector(".container-image-pick")

    if(!props.disabled){
      container?.scrollTo({
        left: container.scrollWidth
      })
    }
    
  }, [images])

  const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.DataUrl
      });

      setImages(prevState => [...prevState, image.dataUrl!]);
  };

  const removeImage = (index: number) => {
    setImages(images.map((item, indexImage) => indexImage != index ? item : "").filter(item => item !=  ""))
  }

  return (
    <div className="container-image-pick"
    style={{
      "--size-image-pick": props.size ?`${props.size}px` : "300px"
    } as React.CSSProperties}
    >
      {images?.map((image, index) => (
        <div className="border-image-pick relative mr-5">
          {!props.disabled &&
            <IoClose 
            className="absolute right-0" 
            color="white"
            size={50}
            onClick={() => removeImage(index)}/>
          }
          <img
          className={`w-full h-full object-cover ${props.cssClass}`}
          src={image}
          alt="" /> 
        </div>
        ))
      }
      {!props.disabled && images.length < imageLimit && (
        <div 
        className={`border-image-pick flex justify-center items-center flex-none ${props.cssClass}`} 
        onClick={() => props.disabled || takePicture()}
        style={{
          "--color-task": props.color
        } as React.CSSProperties}
        >
          <div className="image-pick flex flex-col justify-evenly items-center text-white">
            <BsImage size={40}/>
            <div className="text-2xl text-center">Adicionar imagem</div>
          </div>
      </div>
      )}
    </div>
  )
}

export default ImagePick;