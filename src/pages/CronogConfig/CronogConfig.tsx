//lib external
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from 'yup';

//components internal
import BackButton from "../../components/BackButton";
import FieldForm from "../../components/FieldForm";
import Template from "../../components/Template";
import DaysWeek from "../../components/DaysWeek";
import ModalSelectionIcons from "../../components/ModalSelectionIcons";
import Button from "../../components/Button";
import { showToast } from "../../components/Toast/Toast";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/ModalConfirm";

//components external
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoDiffAdded } from "react-icons/go";

//types
import * as propsInput from "../../components/Input/props";
import * as propsSelect from "../../components/Select/props";
import { typeCronog } from "../../types/TypeCronog";
import { Cronog, schemaCronog } from "../../types/Cronog";
import { Days } from "../../types/Days";

//functions
import * as cronogUtils from "../../utils/cronog";
import { getCredentials } from "../../utils/auth";

const CronogConfig = () => {

  //hooks general
  const { id } = useParams<{ id?: string}>();
  const history = useHistory();

  //useState's
  //strings
  const [titlePage, setTitlePage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [day, setDay] = useState<string>();
  const [hour, setHour] = useState<string>();
  const [color, setColor] = useState<string | undefined>('black');
  //boolean
  const [showModalIcons, setShowModalIcons] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  //object
  const [weekDays, setWeekDays] = useState<Days[]>();
  const [type, setType] = useState<typeCronog>();
  const [icon, setIcon] = useState<IconProp>();
  const [initialData, setInitialData] = useState<Cronog>();

  //useEffect's
  useEffect(() => {
    if(id){
      cronogUtils.getCronogById(id).then((data) => {
        if(data.success){
          setInitialData(data.data);
          setTitle(data.data?.title);
          setType(data.data?.type)
          setWeekDays(data.data?.weekdays);
          setColor(data.data?.color);
          setIcon(data.data?.icon);
          setDay(data.data?.date);
          setHour(data.data?.time);
          setLoadingPage(false);
        }
      })
      setTitlePage("Editar Cronog");
    }else{
      setTitlePage("Novo Cronog");
      setLoadingPage(false);
    }
  }, [id]);

  //functions
  const saveCronog = async () => {
    const payload = {
      id: id,
      userId: getCredentials()?.uid,
      order: 9999,
      title: title,
      type: type,
      icon: icon,
      date: day,
      time: hour,
      weekdays: weekDays,
      color: color,
    } as Cronog

      setLoadingSave(true);
      await schemaCronog.validate(payload)
        .then(async () => {

          let response;
          if(id)
            response = await cronogUtils.updateCronog(payload, id);
          else
            response = await cronogUtils.saveCronog(payload);

          if(response.success){
            showToast("success", response.message);
            history.push("/home");
          }else{
            showToast("error", response.message);
          }
        })
        .catch((err : yup.ValidationError) => {
          showToast('error', err.message)
        })
      setLoadingSave(false);
  }

  const deleteCronog = async () => {
    setShowModalConfirm(false);
    setLoadingDelete(true);
    const response = await cronogUtils.deleteCronog(id);

    if(response.success){
      showToast("success", response.message);
      history.push("/home");
    }else{
      showToast("error", response.message);
      setLoadingDelete(false);
    }
  }
  
  return (
    <Template
    colorMenuHamburguer="white"
    classCssHeader="header-cronog"
    colorHeader={color}
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
      classCssBody="flex flex-col"
      renderBody={loadingPage ? <Loading size={"40"} /> :
        <>
          <FieldForm
          textLabel="Titulo"
          classCss="text-3xl"
          typeField={0}
          propsParent={{
            id: "cronogConfig.title",
            name: "cronogConfig.title",
            style: "text-3xl text-center",
            type: "text",
            initialValue: initialData?.title,
            maxLength:20,
            events:{
              onChange: (value : string) => setTitle(value)
            }
          } as propsInput.default}
          />
          <FieldForm
          textLabel="Tipo"
          typeField={2}
          classCss={"!mb-5 text-3xl"}
          propsParent={{
            id: "cronogConfig.type",
            name: "cronogConfig.type",
            initialValue: initialData?.type,
            style: "text-3xl text-center",
            options: [
              {
                text: "Escolha uma opção",
                value: ""
              },
              {
                text: "Diário",
                value: "0"
              },
              {
                text: "Semanal",
                value: "1"
              },
              {
                text: "Mensal",
                value: "2"
              },
              {
                text: "Personalizado",
                value: "3"
              }],
            events:{
              onChange: (value : number) => setType(value)
            }
          } as unknown as propsSelect.default}
          />
          {type !== 2 ? (
             <>
              <div className="flex-1 mx-1 my-4 text-3xl">
                <label>Dias da Semana</label>
                <DaysWeek
                color={color}
                size={45}
                initialValue={initialData?.weekdays}
                onChange={(value) => setWeekDays(value)}
                />
              </div>
              <div className="flex-1 flex">
                <FieldForm
                textLabel="Horário"
                classCss="text-3xl"
                typeField={0}
                propsParent={{
                  id: "cronogConfig.hour",
                  name: "cronogConfig.hour",
                  style: "text-3xl text-center justify-center flex",
                  type: "time",
                  initialValue: initialData?.time,
                  events:{
                    onChange: (value : string) => setHour(value)
                  }
                } as propsInput.default}
                />
                <FieldForm
                textLabel="Cor"
                classCss="text-3xl"
                typeField={0}
                propsParent={{
                  id: "cronogConfig.color",
                  name: "cronogConfig.color",
                  style: "text-3xl",
                  initialValue: color,
                  type: "color",
                  events:{
                    onChange: (value : string) => setColor(value)
                  }
                } as propsInput.default}
                />
                <div className="flex-1 flex flex-col">
                  <label className="text-3xl">Icone</label>
                  <div className="items-center flex justify-center">
                    {icon ? 
                      <FontAwesomeIcon 
                      onClick={() => setShowModalIcons(prevState => !prevState)}
                      style={{
                        fontSize: "3rem",
                        color: color
                      }} 
                      icon={icon} /> 
                      : 
                      <GoDiffAdded 
                      onClick={() => setShowModalIcons(prevState => !prevState)}
                      style={{
                        fontSize: "3rem",
                        color: color
                      }} />
                    }
                  </div>
                </div>       
              </div>
            </>
          ) : 
          (
            <>
              <div className="flex mb-4">
                <FieldForm
                textLabel="Dia"
                classCss="text-3xl"
                typeField={2}
                propsParent={{
                  id: "cronogConfig.day",
                  name: "cronogConfig.day",
                  initialValue: initialData?.date,
                  style: "text-3xl text-center justify-center text-center",
                  options: Array.from(Array(31).keys()).map((item) => {
                    return {
                      text: (item + 1).toString(),
                      value: (item + 1).toString()
                    };
                  }),
                  events: {
                    onChange: (value : string) => setDay(value)
                  }
                } as unknown as propsSelect.default}
                />
                <FieldForm
                textLabel="Horário"
                classCss="text-3xl"
                typeField={0}
                propsParent={{
                  id: "cronogConfig.hour",
                  name: "cronogConfig.hour",
                  type: "time",
                  style:"text-3xl text-center justify-center flex",
                  initialValue: initialData?.time,
                  events:{
                    onChange: (value : string) => setHour(value)
                  }
                } as propsInput.default}
                />
              </div>
              <div className="flex">
                <FieldForm
                  textLabel="Cor"
                  classCss="text-3xl"
                  typeField={0}
                  propsParent={{
                    id: "cronogConfig.color",
                    name: "cronogConfig.color",
                    initialValue: color,
                    type: "color",
                    style:"text-3xl",
                    events:{
                      onChange: (value : string) => setColor(value)
                    }
                  } as propsInput.default}
                  />
                  <div className="flex-1 flex flex-col">
                    <label className="text-3xl">Icone</label>
                    <div className="items-center flex justify-center">
                      {icon ? 
                        <FontAwesomeIcon 
                        onClick={() => setShowModalIcons(prevState => !prevState)}
                        style={{
                          fontSize: "3rem",
                          color: color
                        }} 
                        icon={icon} /> 
                        : 
                        <GoDiffAdded 
                        onClick={() => setShowModalIcons(prevState => !prevState)}
                        style={{
                          fontSize: "3rem",
                          color: color
                        }} />
                      }
                    </div>
                  </div>
              </div>
            </>
          )}
          <div className="flex flex-col h-full justify-end">
            {id && (
              <Button 
              classCss="btn-main-color h-10 !bg-white !text-fuchsia-800"
              action={() => setShowModalConfirm(true)}
              >
                {loadingDelete ? <Loading size="20" /> : "EXCLUIR"}
              </Button>
            )}
            <Button 
            classCss="btn-main-color h-10 mt-2"
            action={saveCronog}
            >
              {loadingSave ? <Loading color="white" size="20" /> : "SALVAR"}
            </Button>
          </div>
          <ModalSelectionIcons 
          showModal={showModalIcons}
          closeModal={() => setShowModalIcons(prevState => !prevState)}
          onSelected={(value) => setIcon(value)}
          />
          <ModalConfirm
          showModal={showModalConfirm}
          closeModal={() => setShowModalConfirm(prevState => !prevState)}
          text="Confirma a exclusão? Todas as tarefas serão perdidas"
          actionConfirm={() => deleteCronog()}
          />
        </>
      }
      />
  )
}

export default CronogConfig