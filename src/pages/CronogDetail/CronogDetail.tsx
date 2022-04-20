import Template from "../../components/Template";

import "./styles.css";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

const CronogDetail = () => {

  const { id, title, color } = useParams<{ id: string, title: string, color: string }>();

  return (
    <Template 
    colorHeader={color.replace("@", "#")}
    classCssHeader="text-white"
    colorMenuHamburguer="white"
    renderHeader={
      <>
        <BackButton path="/home" color="white"/>
        <p>{title.replace("-", " ")}</p>
      </>
    }
    renderBody={
      <></>
    }
    />
  )
}

export default CronogDetail