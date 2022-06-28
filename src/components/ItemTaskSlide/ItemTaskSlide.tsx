import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import ImagePick from "../ImagePick";
import { Props } from "./props";

import "./styles.css";

const ItemTaskSlide = (props: Props) => {

  const history = useHistory();

  return (
    <div
    className="flex flex-col items-center mb-5 background-color p-2 rounded-2xl"
    onClick={() => history.push(`/home/task-config/${props.task.cronogId}/${props.task.order}/${props.task.id}`)}
    style={{
      "--color-task" : props.color
    } as React.CSSProperties}
    >
      <ImagePick
        color={props.color}
        initialValue={props.task.imgs}
        cssClass="w-full"
        disabled
        events={{}}
      />
      <div className="field-slide-task font-bold background-color-field text-2xl">{props.task.title}</div>
      <div className="field-slide-task font-bold background-color-field text-1xl">{dayjs(props.task.createAt).format('DD/MM/YYYY')}</div>
    </div>
  )
}

export default ItemTaskSlide