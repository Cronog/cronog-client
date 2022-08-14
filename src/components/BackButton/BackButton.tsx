import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";

import Props from './props'

const BackButton = (props : Props) => {

    const history = useHistory();

  return <IoIosArrowBack
            style={{
                color: props.color || "black"
            }}
            size={props.size || "35"}
            onClick={() => {
                history.push(props.path)
                if(props.actionClick)
                    props.actionClick()
            }}/>
}

export default BackButton