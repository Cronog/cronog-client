import React, { useEffect, useState } from "react";
import { Camera, CameraResultType } from '@capacitor/camera';

import { IoClose } from "react-icons/io5";
import { BsImage } from "react-icons/bs"
import ModalImagePreview from "../ModalImagePreview";
import ModalConfirm from "../ModalConfirm";

import Props from "./props"

import "./styles.css";

function ImagePick(props: Props) {
  
  const imageLimit = 2;

  const [images, setImages] = useState<string[]>([]);
  const [imageShow, setImageShow] = useState<string>();
  const [showModalImagePreview, setShowModalImagePreview] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [indexRemoveImage, setIndexRemoveImage] = useState<number>();
  
  const { onChange } = props.events;

  useEffect(() => {
    if(props.initialValue?.length)
      setImages(props.initialValue)
  }, props.initialValue)

  useEffect(() => {
    if(onChange) onChange(images)

    let container = document.querySelector(".container-image-pick")

    if(props.activateScrollAnimation){
      container?.scrollTo({
        left: 150,
      })
      setTimeout(() => {
        container?.scrollTo({
          left: 0,
        })
      }, 1000)
    }
  }, [props.activateScrollAnimation, images])

  useEffect(() => {
    setShowModalImagePreview(imageShow ? true : false);
  }, [imageShow])

  const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.DataUrl
      });

      setImages(prevState => [...prevState, image.dataUrl!]);
  };

  const removeImage = (index: number) => {
    setImages(prevState => prevState.filter((item, indexImage) => indexImage != index))
  }

  const modalConfirmRemove = (index?: number) => {
      setIndexRemoveImage(index);
      setShowModalConfirm(prevState => !prevState);
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
            onClick={() => modalConfirmRemove(index)}/>
          }
          <img
          className={`w-full h-full object-cover ${props.cssClass}`}
          src={image}
          onClick={() => setImageShow(image)}
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
      <ModalImagePreview 
      color={props.color}
      image={imageShow!}
      showModal={showModalImagePreview}
      closeModal={() => setImageShow(undefined)}
      />
      <ModalConfirm
      actionConfirm={() => removeImage(indexRemoveImage!)}
      closeModal={() => modalConfirmRemove()}
      color={props.color}
      showModal={showModalConfirm}
      text={"Confirmar exclusão da imagem?"}
      />

    </div>
  )
}


export default ImagePick;