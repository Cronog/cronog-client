import { useHistory } from "react-router-dom";
import { useRef } from "react";

import Cronog from "../../components/Cronog";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AiOutlinePlusSquare } from "react-icons/ai";

import "./styles.css";
import Template from "../../components/Template";

const Home = () => {

    const history = useHistory();
    const refInputSearchCronog = useRef<HTMLInputElement>(null);

  return (
    <>
    <Template
    styleHeader="header-home"
    styleBody={"body-home"}
    renderBody={
        <>
            <div className="mb-5">
                <Input 
                id="searchCronog"
                name="searchCronog"
                type="text"
                style="!rounded-full placeholder:text-white !text-white input-search"
                placeholder="Pesquisar..."
                styleContainer="flex-1"
                ref={refInputSearchCronog}
                events={{}}
                />
            </div>
            <div className="list-cronog">
            </div>
             <div className="container-btn-add-cronog">
                <Button
                style="btn-orange"
                action={() => history.push("home/cronog")}>
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