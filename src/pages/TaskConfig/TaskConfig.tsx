import { useHistory, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as yup from "yup";

import Template from "../../components/Template"
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/ModalConfirm";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import ImagePick from "../../components/ImagePick";
import { showToast } from "../../components/Toast/Toast";

import { setBetterContrast } from "../../utils/color";
import * as taskUtils from "../../utils/task";

import { schemaTask, Task } from "../../types/Task";

import { Props } from "./props";

import "./styles.css";

const TaskConfig = (props : Props) => {

    const history = useHistory();
    let { cronogId, order, id } = useParams<{ cronogId: string, order: string, id?: string }>();

    const [titlePage, setTitlePage] = useState<string>("Nova Tarefa");
    const [images, setImages] = useState<string[] | undefined>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [loadingSave, setLoadingSave] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [createAt, setCreateAt] = useState<Date>(new Date());

    useEffect(() => {
      if(id && id != "-1"){
        taskUtils.getTaskById(id).then(data => {
          if(data.success){
            setTitle(data.data!.title)
            setImages(data.data!.imgs)
            setDescription(data.data!.description)
            setCreateAt(data.data!.createAt!)
          }
          setLoadingPage(false);
        })
        setTitlePage("Editar Tarefa");
      }
      else if(id){
        const data = taskUtils.getUnfinishedTask(cronogId)
        setTitle(data.title)
        setImages(data.imgs)
        setDescription(data.description)
        setCreateAt(data.createAt)
        setLoadingPage(false);
      }
      else{
        setLoadingPage(false);
      }
    }, [id])

    useEffect(() => {
      if(title && images && (!id || id == "-1")){
        taskUtils.setUnfinishedTask({
          cronogId: cronogId,
          title: title,
          imgs: images,
          createAt: createAt,
          order: parseInt(order),
          description: description,
        } as Task, cronogId)
      }
    }, [title, images, createAt, description])

  //functionS
  const saveTask = async () => {
    const payload = {
      id: id,
      cronogId: cronogId,
      title: title,
      imgs: images,
      createAt: createAt,
      order: parseInt(order),
      description: description,
    } as Task

      setLoadingSave(true);
      await schemaTask.validate(payload)
        .then(async () => {
          let response;
          payload.imgs = [];
          if(id && id != "-1")
            response = await taskUtils.updateTask(payload, images!, id, cronogId);
          else
            response = await taskUtils.saveTask(payload, images!);

          if(response.success){
            showToast("success", response.message);
            taskUtils.clearUnfinishedTask(cronogId)
            history.push(`/home/cronog-detail/${cronogId}`);
          }else{
            showToast("error", response.message);
          }
        })
        .catch((err : yup.ValidationError) => {
          showToast('error', err.message)
        })
      setLoadingSave(false);
  }

  const deleteTask = async () => {
    setLoadingDelete(true);
    const response = await taskUtils.deleteTask(id, cronogId);

    if(response.success){
      showToast("success", response.message);
      history.push(`/home/cronog-detail/${cronogId}`);
    }else{
      showToast("error", response.message);
      setLoadingDelete(false);
    }
  }

  return (
    <Template
    colorHeader={props.currentCronog.color}
    colorMenuHamburguer="white"
    classCssBody="overflow-y-auto"
    pathBack={`/home/cronog-detail/${cronogId}`}
    backAction={() => id && id == "-1" ? taskUtils.clearUnfinishedTask(cronogId) : ""}
    renderHeader={
        <>{titlePage}</>
    }
    renderBody={loadingPage ? <Loading color={props.currentCronog.color} size="60"/> :
      (
        <>
          <div
          className="flex flex-col items-center h-full"
          style={{
            "--color-task" : props.currentCronog.color
          } as React.CSSProperties}
          >
            <div className="w-full mb-5">
              <Input
                id="taskConfig.title"
                name="taskConfig.title"
                initialValue={title}
                placeholder="Título"
                colorBorder={props.currentCronog.color}
                type="text"
                maxLength={20}
                events={{
                  onChange: value => setTitle(value)
                }}
              />
            </div>
            <div className="w-full flex justify-center mb-5">
              <ImagePick 
                activateScrollAnimation
                color={props.currentCronog.color}
                initialValue={images}
                events={{
                  onChange: value => setImages(value)
                }}
              />
            </div>
            <div className="w-full mb-5">
              <TextArea
                id="taskConfig.description"
                name="taskConfig.description"
                initialValue={description}
                colorText={setBetterContrast(props.currentCronog.color)}
                colorBackground={props.currentCronog.color}
                colorBorder={props.currentCronog.color}
                maxLength={100}
                rows={5}
                events={{
                  onChange: value => setDescription(value)
                }}
              />
              </div>
            <div className="flex flex-1 flex-col w-full justify-end">
              {id && id != "-1" && (
                <Button
                textColor={props.currentCronog.color}
                borderColor={props.currentCronog.color}
                backgroundColor="transparent"
                classCss="h-10"
                action={() => setShowModalConfirm(true)}
                >
                  {loadingDelete ? <Loading color={props.currentCronog.color} size="40" /> : "EXCLUIR"}
                </Button>
              )}
              <Button
              classCss="h-10 mt-2"
              backgroundColor={props.currentCronog.color}
              action={() => saveTask()}
              >
                {loadingSave ? <Loading color="white" size="40" /> : "SALVAR"}
              </Button>
            </div>
          </div>
          <ModalConfirm
          color={props.currentCronog.color}
          showModal={showModalConfirm}
          closeModal={() => setShowModalConfirm(false)}
          text="Confirma a exclusão? Todas as tarefas serão perdidas"
          actionConfirm={() => deleteTask()}
          />
        </>
      )
    }
    />
  )
}

const mapStateToProps = (state : any) => ({
  currentCronog: state.CronogReducer.currentCronog,
});

const mapDispatchToProps = (dispatch : any) => ({});

export default connect(
mapStateToProps,
mapDispatchToProps
)(TaskConfig);