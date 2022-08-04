//lib external
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from 'yup';

//components internal
import Template from "../../components/Template";
import DaysWeek from "../../components/DaysWeek";
import ModalSelectionIcons from "../../components/ModalSelectionIcons";
import Button from "../../components/Button";
import { showToast } from "../../components/Toast/Toast";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/ModalConfirm";
import ModalSelectionColor from "../../components/ModalSelectionColor";
import Select from "../../components/Select";
import Input from "../../components/Input";

//components external
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoDiffAdded } from "react-icons/go";

//types
import { typeCronog } from "../../types/TypeCronog";
import { Cronog, schemaCronog } from "../../types/Cronog";
import { Days } from "../../types/Days";

//functions
import * as cronogUtils from "../../utils/cronog";
import { getCredentials } from "../../utils/auth";
import { setNotification } from "../../utils/notification";

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
  const [showModalColors, setShowModalColors] = useState<boolean>(false);
  //object
  const [weekDays, setWeekDays] = useState<Days[]>();
  const [icon, setIcon] = useState<IconDefinition>();
  const [initialData, setInitialData] = useState<Cronog>();
  const [type, setType] = useState<typeCronog>(0);
  //number
  const [notificationId, setNotificationId] = useState<number>(0);

  //useEffect's
  useEffect(() => {
    if(id){
      cronogUtils.getCronogById(id).then((data) => {
        if(data.success && data.data){
          setInitialData(data.data);
          setNotificationId(data.data.notificationId);
          setTitle(data.data.title);
          setType(data.data.type)
          setWeekDays(data.data.weekdays);
          setColor(data.data.color);
          setIcon(data.data.icon);
          setDay(data.data.date);
          setHour(data.data.time);
          setLoadingPage(false);
        }
      })
      setTitlePage("Editar Cronog");
    }else{
      setTitlePage("Novo Cronog");
      setLoadingPage(false);
    }
  }, [id]);

  useEffect(()=> {
    if(type == typeCronog.diary) setWeekDays([0, 1, 2, 3, 4, 5, 6]);
    if(type == typeCronog.weekly) setWeekDays([0]);
    if(type == typeCronog.monthly) setWeekDays([]);
    if(type != typeCronog.monthly) setDay("1");
  }, [type]);

  useEffect(()=> {
    if(weekDays){
      if(weekDays.length >= 2 && weekDays.length < 7) setType(typeCronog.custom);
      if(weekDays.length == 7) setType(typeCronog.diary);
    }
  }, [weekDays]);

  //functions
  const saveCronog = async () => {
    const payload = {
      id: id,
      userId: getCredentials()?.uid,
      notificationId: notificationId,
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
            setNotification(response.data, payload);
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
    <>
    {loadingPage ? <Loading size={"60"} /> :
    <Template
    colorMenuHamburguer="white"
    classCssHeader="header-cronog"
    colorHeader={color}
    pathBack="/home"
    renderHeader={<>{titlePage}</>}
      classCssBody="flex flex-col"
      renderBody={
        <>
          <div className="mb-12">
            <Input
              id="cronogConfig.title"
              placeholder="Titulo"
              name="cronogConfig.title"
              classCss="text-center"
              colorBorder={color}
              type="text"
              initialValue={initialData?.title}
              maxLength={20}
              events={{
                onChange: value => setTitle(value)
              }}
            />
          </div>
          <div className="mb-12">
            <Select
              id="cronogConfig.type"
              name="cronogConfig.type"
              initialValue={type || initialData?.type || ""}
              classCss="text-center"
              colorBorder={color}
              options={[
                {
                  text: "Escolha uma opção",
                  value: typeCronog.initial
                },
                {
                  text: "Diário",
                  value: typeCronog.diary
                },
                {
                  text: "Semanal",
                  value: typeCronog.weekly
                },
                {
                  text: "Mensal",
                  value: typeCronog.monthly
                },
                {
                  text: "Personalizado",
                  value: typeCronog.custom
                }]}
              events={{
                onChange: value => setType(value as typeCronog)
              }}
            />
          </div>
          <div className="flex-1 mx-1 my-4 mb-12">
            <DaysWeek
              disabled={type == typeCronog.monthly ? true : false}
              color={color}
              size={45}
              initialValue={weekDays || initialData?.weekdays}
              onChange={value => setWeekDays(value)}
            />
          </div>
          <div className="flex mb-12">
            <Select
              id="cronogConfig.day"
              name="cronogConfig.day"
              initialValue={day || initialData?.date}
              classCss="text-center justify-center text-center"
              colorBorder={color}
              disabled={type != typeCronog.monthly ? true : false}
              options={Array.from(Array(31).keys()).map((item) => {
                return {
                  text: (item + 1).toString(),
                  value: (item + 1).toString()
                }
              })}
              events={{
                onChange: value => setDay(value as string)
              }}
            />
            <Input
              id="cronogConfig.hour"
              placeholder="Horário"
              name="cronogConfig.hour"
              classCss="text-center justify-center flex"
              colorBorder={color}
              type="time"
              initialValue={initialData?.time}
              events={{
                onChange: value => setHour(value)
              }}
            />
          </div>
          <div className="flex">
            <div className="flex-1">
              <div 
                className="default-input rounded-3xl"
                onClick={() => setShowModalColors(true)}
                style={{
                  backgroundColor: color
                }}>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="items-center flex justify-center">
                {icon ? 
                  <FontAwesomeIcon 
                  onClick={() => setShowModalIcons(true)}
                  style={{
                    fontSize: "2.5rem",
                    color: color
                  }} 
                  icon={icon} /> 
                  : 
                  <GoDiffAdded 
                  onClick={() => setShowModalIcons(true)}
                  style={{
                    fontSize: "2.5rem",
                    color: color
                  }} />
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full justify-end">
            {id && (
              <Button 
              classCss="h-10"
              textColor={color}
              borderColor={color}
              backgroundColor="transparent"
              action={() => setShowModalConfirm(true)}
              >
                {loadingDelete ? <Loading size="40" /> : "EXCLUIR"}
              </Button>
            )}
            <Button 
            classCss="h-10 mt-2"
            backgroundColor={color}
            action={saveCronog}
            >
              {loadingSave ? <Loading color="white" size="40" /> : "SALVAR"}
            </Button>
          </div>
          <ModalSelectionIcons 
          showModal={showModalIcons}
          iconSelected={icon}
          colorSelected={color}
          closeModal={() => setShowModalIcons(false)}
          onSelected={(value) => setIcon(value)}
          />
          <ModalSelectionColor 
          showModal={showModalColors}
          colorSelected={color}
          closeModal={() => setShowModalColors(false)}
          onSelected={(value) => setColor(value)}
          />
          <ModalConfirm
          color={color}
          showModal={showModalConfirm}
          closeModal={() => setShowModalConfirm(false)}
          text="Confirma a exclusão? Todas as tarefas serão perdidas"
          actionConfirm={() => deleteCronog()}
          />
        </>
      }
      />
    }</>
  )
}

export default CronogConfig