import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Cronog from "../../components/Cronog";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AiOutlinePlusSquare } from "react-icons/ai";

import "./styles.css";
import Template from "../../components/Template";
import Loading from "../../components/Loading";
import { getCronogByUserId, updateCronog } from "../../utils/cronog";
import { Cronog as CronogType } from "../../types/Cronog";

const Home = () => {

    const history = useHistory();
    const refInputSearchCronog = useRef<HTMLInputElement>(null);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [updateDisplay, setUpdateDisplay] = useState<boolean>(false);
    const [cronogs, setCronogs] = useState<CronogType[]>();

    useEffect(() => {
        cronogs?.forEach((item, index) => {
            item.order = index;
            updateCronog(item, item.id);
        })
    }, [updateDisplay])

    useEffect(() => {
        getCronogByUserId().then(data => {
            if(data.success) setCronogs(data.data);
            
            setLoading(false);
        });
    }, [])

    const move = (from : number, to : number) => {
        setCronogs(prevState => {
            const cronogDragged = prevState?.splice(from, 1)[0] || {} as CronogType;
            prevState?.splice(to, 0, cronogDragged);
            return prevState
        })

        setUpdateDisplay(prevState => !prevState);
    }

  return (
    <>
    <Template
    classCssHeader="header-home"
    classCssBody="body-home"
    colorHeader="white"
    renderBody={
        loading ? <Loading size="50" /> : 
        <>
            <div className="mb-5">
                <Input 
                id="searchCronog"
                name="searchCronog"
                type="text"
                classCss="!rounded-full placeholder:text-white !text-white input-search"
                placeholder="Pesquisar..."
                classCssContainer="flex-1"
                ref={refInputSearchCronog}
                events={{}}
                />
            </div>
            <div
            className="list-cronog"
            >
                {cronogs?.map((item, index) => <Cronog move={(from, to) => move(from, to)} index={index} cronog={item} />)}
            </div>
             <div className="container-btn-add-cronog">
                <Button
                classCss="btn-main-color"
                action={() => history.push("home/cronog-config")}>
                    <AiOutlinePlusSquare />
                </Button>
            </div>
        </>
    }
    />
    </>
  )
}

export default Home
