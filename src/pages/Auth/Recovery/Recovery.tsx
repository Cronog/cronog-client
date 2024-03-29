import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Template from "../../../components/Template";
import { showToast } from "../../../components/Toast/Toast";
import "../auth.styles.css";

import * as authUtils from "../../../utils/auth";

import "../auth.styles.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";

const logo = require("../../../assets/logo.png");

const Recovery = () => {

    const refEmail = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { email } = useParams<{ email?: string}>();
    const history = useHistory();

    const recovery = async () => {
        setIsLoading(true);
        const response = await authUtils.recovery(refEmail.current?.value || "");

        if(response.success){
            history.push("/auth/login");
            showToast("success", response.message);
        }
        else
            showToast("error", response.message)  
    }

  return (
    <Template
    classCssHeader="container-auth color-auth"
    hideMenuHamburguer={true}
    colorBody="var(--main-color)"
    pathBack="/auth/login"
    classCssBody="flex flex-col items-center"
    colorContainer="var(--main-color)"
    renderBody={
      <>
      <img src={logo} className="logo" alt=""/>
      <div className="w-full h-full flex flex-col px-10 items-center overflow-y-auto">
        <Input
        id="recovery.email"
        name="recovery.email"
        type="email"
        placeholder="Email"
        initialValue={email}
        classCssContainer="mt-20"
        classCss="input-auth color-auth"
        ref={refEmail}
        events={{}}
        />
        <Button
        classCss="btn-auth"
        type="button"
        textColor="var(--main-color)"
        action={recovery}
        >
          {isLoading ? <Loading size="40" /> : "Recuperar"}
        </Button>
      </div>
      </>
    }
    />
  )
}

export default Recovery