//libs external
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//components internal
import DaysWeek from "../DaysWeek";

//components external
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWrench } from "react-icons/fa"

//functions
import * as cronogActions from "../../redux/actions/cronog";

//types
import { Cronog as cronogType } from "../../types/Cronog";
import { typeCronog } from "../../types/TypeCronog";

//props
import { Props } from "./props";

//styles

import "./styles.css";

const Cronog = (props : Props) => {

  //hoocks general
  const history = useHistory();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: { index: props.index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    []
  );

  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: "CARD",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop : (item: any) => {
        const draggedIndex = item.index;
        const targetIndex = props.index;

        if(draggedIndex ===  targetIndex)
          return;

        props.move(draggedIndex, targetIndex);
      },
    })
  )

  //useRef
  const ref = useRef<HTMLDivElement>(null);

  dragRef(dropRef(ref));

  return (
        <div
      id={props.cronog.id}
      ref={ref}
      className={!isDragging && canDrop && isOver ? "container-cronog animation-target" : "container-cronog"}
      style={{
        "--color-cronog": isDragging ? "transparent" : props.cronog.color,
        "--color-border": props.cronog.color,
        border: "3px dashed var(--color-border)"
      } as React.CSSProperties}
      >
        <div className="flex flex-col h-full"
        style={{
          display: isDragging ? "none" : ""
        }}>
          <div className="flex justify-end h-5">
            <FaWrench onClick={() => history.push(`/home/cronog-config/${props.cronog.id}`)} size={15} />
          </div>
          <div
          className="flex flex-col h-full"
          onClick={() => {
            if(props.setCurrentCronog) props.setCurrentCronog(props.cronog)
            history.push(`/home/cronog-detail/${props.cronog.id}`)}
          }>
          <div className="flex">
            <FontAwesomeIcon
              icon={props.cronog.icon}
              style={{
                height: "40px",
                width: "40px"
              }}
            />
            <div className="flex flex-1 justify-center items-center font-bold text-2xl">
              {props.cronog.title}
            </div>
          </div>
          <div className="flex justify-around mt-2">
            <div className="flex flex-col items-center">
              <div className="font-bold">Tipo</div>
              {props.cronog.type == 1 ? <div>Diário</div> : <></>}
              {props.cronog.type == 2 ? <div>Semanal</div> : <></>}
              {props.cronog.type == 3 ? <div>Mensal</div> : <></>}
              {props.cronog.type == 4 ? <div>Personalizado</div> : <></>}
            </div>
            {props.cronog.type == typeCronog.monthly ?
            (
              <>
                <div className="flex flex-col items-center">
                    <div className="font-bold">Dia</div>
                    <div>{props.cronog.date}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-bold">Hora</div>
                  <div>{props.cronog.time}</div>
              </div>
              </>
            )
            :
            (
              <div className="flex flex-col items-center">
                  <div className="font-bold">Hora</div>
                  <div>{props.cronog.time}</div>
              </div>
            )}
          </div>
          {props.cronog.type != typeCronog.monthly && (
            <div className="mt-2">
              <DaysWeek
              color={props.cronog.color}
              initialValue={props.cronog.weekdays}
              size={20}
              readOnly
              />
            </div>
          )}
          <div className="items-end flex flex-1">
            <span className="font-bold">Concluidas:&ensp;</span> {props.cronog.taskCount}
          </div>
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch : any) => ({
      setCurrentCronog : (cronog : cronogType) => 
        dispatch(cronogActions.setCurrentCronog(cronog))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cronog);