import Template from "../../components/Template";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";

const CronogDetail = () => {

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
    <></>
  )
}

export default CronogDetail