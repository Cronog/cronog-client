//libs external
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

//components internal
import DaysWeek from "../DaysWeek";

//components external
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWrench } from "react-icons/fa"

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
  const [, dropRef] = useDrop(
    () => ({
      accept: "CARD",
      hover: (item : any, monitor : any ) => {
        const draggedIndex = item.index;
        const targetIndex = props.index;

        if(draggedIndex ===  targetIndex)
          return;

        props.move(draggedIndex, targetIndex);

        item.index = targetIndex
      }
    })
  )

  //useRef
  const ref = useRef<HTMLDivElement>(null);

  dragRef(dropRef(ref));

  return (
        <div 
          id={props.cronog.id}
          className="container-cronog"
          ref={ref}
          style={{
            "--color-cronog": props.cronog.color,
            border: isDragging ? "3px dashed black" : "3px solid var(--color-cronog)"
          } as React.CSSProperties} 
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end h-5">
                <FaWrench onClick={() => history.push(`/home/cronog-config/${props.cronog.id}`)} size={15} />
              </div>
              <div 
              className="flex flex-col h-full" 
              onClick={() => history.push(`/home/cronog-detail/${props.cronog.id}/${props.cronog.title.replace(" ", "-")}/${props.cronog.color.replace("#", "@")}`)}>
              <div className="flex">
                <FontAwesomeIcon style={{
                  height: "40px",
                  width: "40px"
                }} icon={props.cronog.icon} />
                <div className="flex flex-1 justify-center items-center font-bold text-2xl">
                  {props.cronog.title}
                </div>
              </div>
              <div className="flex justify-around mt-2">
                <div className="flex flex-col items-center">
                  <div className="font-bold">Tipo</div>
                  {props.cronog.type === 0 ? <div>Diário</div> : <></>}
                  {props.cronog.type === 1 ? <div>Semanal</div> : <></>}
                  {props.cronog.type === 2 ? <div>Mensal</div> : <></>}
                  {props.cronog.type === 3 ? <div>Personalizado</div> : <></>}
                </div>
                {props.cronog.type === 2 ? 
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
              <div className="mt-2">
                <DaysWeek 
                color={props.cronog.color}
                initialValue={props.cronog.weekdays}
                size={20}
                disabled
                />
              </div>
              <div className="items-end flex flex-1">
                <span className="font-bold">Concluidas:&ensp;</span> 0
              </div>
              </div>
            </div>
          </div>    
  )
}

export default Cronog