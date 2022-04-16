import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import Template from "../../components/Template";
import "./styles.css";

const CronogConfig = () => {

  const { id } = useParams<{ id?: string}>();
  const [titlePage, setTitlePage] = useState<string>();

  useEffect(() => {
    if(id){
      setTitlePage("Editar Cronog");
    }else{
      setTitlePage("Novo Cronog");
    }
  }, [id])
  
  return (
    <Template
    colorMenuHamburguer="white"
      styleHeader="header-cronog"
      renderHeader={
      <>
        <div className="btn-back">
          <BackButton path="/home" color="white" />
        </div>
        <div className="title text-white">
          {titlePage}
        </div>
      </>
      }
      renderBody={
        <>
          <Input
            id="cronogConfig.title"
            name="cronogConfig.title"
            maxLength={20}
            minLength={1}
            type="text"
            placeholder="Titulo"
            initialValue=""
            events={{}}
            />
        </>
      }
      />
  )
}

export default CronogConfig