import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Template from "../../../components/Template";
import { showToast } from "../../../components/Toast/Toast";
import Login from "../../../types/Login";

import * as authUtils from "../../../utils/auth";

import "../auth.styles.css";

const logo = require("../../../assets/logo.png");

const Register = () => {

    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const refRepeatPassword = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const history = useHistory();
    const { email } = useParams<{ email?: string}>();

    const register = async () => {

      if(!validRepeatPassword(refRepeatPassword.current?.value || "")){
        showToast("error", "As senhas são diferentes")
        return
      }

        setIsLoading(true);
        const response = await authUtils.register({
            email: refEmail.current?.value,
            password: refPassword.current?.value
        } as Login);

        if(response.success)
            history.push("/auth/login");
        else{
            showToast("success", response.message);
            setIsLoading(false);
        }
    }

    const validRepeatPassword = (password : string) : boolean => {
        if(password !== refPassword.current?.value){
          return false;
        }
        return true;
    }

  return (
    <Template
    classCssScreen="container-auth color-auth"
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
        id="register.email"
        name="register.email"
        type="email"
        placeholder="Email"
        initialValue={email}
        classCssContainer="mt-20"
        classCss="input-auth color-auth"
        ref={refEmail}
        events={{}}
        />
        <Input
        id="register.password"
        name="register.password"
        type="password"
        placeholder="Senha"
        classCss="mt-5 input-auth color-auth"
        ref={refPassword}
        events={{}}
        />
        <Input
        id="register.repeatPassword"
        name="register.repeatPassword"
        type="password"
        placeholder="Repita a senha"
        classCss="mt-5 input-auth color-auth"
        ref={refRepeatPassword}
        events={{}}
        />
        <Button
        classCss="btn-auth"
        textColor="var(--main-color)"
        action={register}
        >
          {isLoading ? <Loading size="40" /> : "Registrar"}
        </Button>
      </div>
      </>
    }
    />
  )
}

export default Register