import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import ImagePick from '../ImagePick';
import { Props } from './props'

import "./styles.css";
const ItemTaskList = (props: Props) => {

    const history = useHistory();

  return (
    <div 
    className='container-item-task-list rounded-r-full flex'
    onClick={() => history.push(`/home/task-config/${props.task.cronogId}/${props.task.order}/${props.task.id}`)}
    style={{
        backgroundColor: props.color
    }}
    >
        <ImagePick
          initialValue={props.task.img}
          disabled
          cssClass="img-container-item-task-list"
          color={props.color}
          events={{}}
        />
        <div className='ml-3 w-full h-full flex flex-col flex-initial justify-between'>
          <div className='text-white text-4xl font-bold wrap-text-1'>{props.task.title}</div>
          <div className='text-white'>{dayjs(props.task.createAt).format('DD/MM/YYYY HH:mm')}</div>
        </div>
    </div>
  )
}

export default ItemTaskList