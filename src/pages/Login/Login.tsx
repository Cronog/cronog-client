import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";

import Template from "../../components/Template";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { showToast } from "../../components/Toast/Toast";
import Loading from "../../components/Loading";

import { Login as loginType } from "../../types/Login";

import * as authUtils from "../../utils/auth";

import "./styles.css";
import { Keyboard } from "@capacitor/keyboard";

const logo = require("../../assets/logo.JPG");

const Login = () : JSX.Element => {

  const history = useHistory();

  const [contentButton, setContentButton] = useState<any>("Entrar")

  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const singIn = async () => {
    setContentButton(<Loading size="30" />)
    const response = await authUtils.singIn({
      email: refEmail.current?.value,
      password: refPassword.current?.value
    } as loginType)
    if(response.success){
      history.push("/home")
    }else{
      setContentButton("Entrar")
      showToast("error", response.message)
    }
  }

  return (
    <Template
    styleScreen="container-login color-login"
    styleBody="flex flex-col items-center"
    renderBody={
      <>
      <img src={logo} />
      <div className="w-full h-full flex flex-col px-10 items-center overflow-y-auto">
        <Input
        id="login.email"
        name="login.email"
        type="email"
        placeholder="Email"
        styleContainer="mt-20"
        style="input-login color-login"
        ref={refEmail}
        events={{}}
        />
        <Input
        id="login.password"
        name="login.password"
        type="password"
        placeholder="Senha"
        style="mt-5 input-login color-login"
        ref={refPassword}
        events={{}}
        />
        <Button
        style="btn-login"
        type="button"
        action={() => singIn()}
        >
          
          {contentButton}
        </Button>
        <div className="flex flex-col justify-center h-full">
          <a href="/">
            Esqueci minha senha
          </a>
          <a >
            Ainda não tem conta?
          </a>
        </div>
      </div>
      </>
    }
    />
  )
}

export default Login