import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Cronog from "../../components/Cronog";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AiOutlinePlusSquare, AiOutlineSearch } from "react-icons/ai";

import "./styles.css";
import Template from "../../components/Template";
import Loading from "../../components/Loading";
import { getCronogByUserId, updateCronog } from "../../utils/cronog";
import { Cronog as CronogType } from "../../types/Cronog";
import * as cronogActions from "../../redux/actions/cronog";
import { connect } from "react-redux";
import Props from "./props";

const Home = (props: Props) => {

    const history = useHistory();
    const refInputSearchCronog = useRef<HTMLInputElement>(null);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [updateDisplay, setUpdateDisplay] = useState<boolean>(false);
    const [cronogs, setCronogs] = useState<CronogType[]>();
    const [textSearch, setTextSearch] = useState<string>();

    useEffect(() => {
        cronogs?.forEach((item, index) => {
            item.order = index;
            updateCronog(item, item.id);
        })
    }, [updateDisplay])

    useEffect(() => {
        getCronogByUserId().then(data => {
            if(data.success) {
                setCronogs(data.data);
                if(props.setCronogs) props.setCronogs(data.data || [] as CronogType[]);
            }
            
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        if(props.cronogs) setCronogs(props.cronogs?.filter(item => item.title.startsWith(textSearch!)))
    }, [textSearch])

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
        loading ? <Loading size="60" /> : 
        <>
            <div className="flex items-center justify-end mb-5">
                <Input 
                id="searchCronog"
                name="searchCronog"
                type="text"
                colorBorder="var(--main-color)"
                classCss="pr-5"
                placeholder="Pesquisar..."
                ref={refInputSearchCronog}
                events={{
                    onChange: value => setTextSearch(value)
                }}
                />
                <div className="flex absolute">
                    <AiOutlineSearch color="var(--main-color)" fontSize={"20px"} />
                </div>
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

const mapStateToProps = (state : any) => ({
    cronogs: state.CronogReducer.cronogs,
});

const mapDispatchToProps = (dispatch : any) => ({
      setCronogs : (cronogs : CronogType[]) => 
        dispatch(cronogActions.setCronogs(cronogs))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
