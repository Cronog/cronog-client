import Template from "../../components/Template";

import "./styles.css";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai"
import { IoEyeSharp } from "react-icons/io5"
import { PreviewMode } from "../../types/PreviewMode";
import ModalSelectionPreviewMode from "../../components/ModalSelectionPreviewMode";
import { getTaskByCronogId } from "../../utils/task";
import { Task } from "../../types/Task";
import ItemTaskList from "../../components/ItemTaskList";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import { Props } from "./props";
import ItemTaskSlide from "../../components/ItemTaskSlide";
import * as taskUtils from "../../utils/task";

const CronogDetail = (props : Props) => {

  const { id } = useParams<{ id: string, title: string, color: string }>();
  const history = useHistory();

  const [moreOptions, setMoreOptions] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [showModalPreviewMode, setShowModalPreviewMode] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>();
  const [previewMode, setPreviewMode] = useState<PreviewMode>(0);

  useEffect(() => {
    getTaskByCronogId(id).then(data => {
      if(data.success) setTasks(data.data)
      setLoadingPage(false);
    })
  }, [props.currentCronog])

  return (
    <Template 
    colorHeader={props.currentCronog.color}
    classCssHeader="text-white"
    colorMenuHamburguer="white"
    classCssBody="flex flex-col overflow-y-auto"
    pathBack="/home"
    renderHeader={<p>{props.currentCronog.title}</p>}
    renderBody={loadingPage ? <Loading color={props.currentCronog.color} size={"60"} /> :
    (
      <>
      {tasks && <>
        {previewMode == 0 && tasks?.map(item => <ItemTaskList key={item.id} color={props.currentCronog.color} task={item} />)}
        {previewMode == 1 && tasks?.map(item => <ItemTaskSlide key={item.id} color={props.currentCronog.color} task={item} />)}
        {previewMode == 2 && taskUtils.firstLastTask(tasks).map(item => <ItemTaskList key={item.id} color={props.currentCronog.color} task={item} />)}
        {previewMode == 3 && taskUtils.firstLastTask(tasks).map(item => <ItemTaskSlide key={item.id} color={props.currentCronog.color} task={item} />)}
      </>
      }
        <div className="container-btn-opt">
            <div className="container-more-options" style={{
              height: moreOptions ? "187px" : "0",
            }}>
              <Button
              backgroundColor={props.currentCronog.color}
              classCss={"!border-white"}
              action={() => history.push(`/home/task-config/${id}/${tasks?.length || 0 + 1}`)}>
                <AiOutlinePlusSquare size={40} />
              </Button>
              <Button
                backgroundColor={props.currentCronog.color}
                classCss={"!border-white"}
                action={() => setMoreOptions(true)}>
                  <IoEyeSharp onClick={() => setShowModalPreviewMode(true)} size={40} />
              </Button>
            </div>
            <Button
            backgroundColor={props.currentCronog.color}
            classCss={"!border-white"}
            action={() => setMoreOptions(prevState => !prevState)}>
                <IoIosMore  />
            </Button>
        </div>
      <ModalSelectionPreviewMode
      closeModal={() => setShowModalPreviewMode(false)}
      color={props.currentCronog.color}
      onSelected={(value) => setPreviewMode(value)}
      showModal={showModalPreviewMode} 
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
)(CronogDetail);