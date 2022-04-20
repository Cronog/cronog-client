import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Template from "../../../components/Template";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { showToast } from "../../../components/Toast/Toast";
import Loading from "../../../components/Loading";

import { Login as loginType } from "../../../types/Login";

import * as authUtils from "../../../utils/auth";

import "../auth.styles.css";

const logo = require("../../../assets/logo.JPG");

const Login = () : JSX.Element => {

  const history = useHistory();
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailParam, setEmailParam] = useState<string | undefined>("");

  useEffect(() => {
    if(authUtils.authenticatedUser(true))
      history.push("/home")
  }, [history])

  const singIn = async () => {
    setIsLoading(true)
    const response = await authUtils.singIn({
      email: refEmail.current?.value,
      password: refPassword.current?.value
    } as loginType)
    if(response.success){
      history.push("/home")
    }else{
      setIsLoading(false)
      showToast("error", response.message)
    }
  }

  return (
    <Template
    classCssScreen="container-auth color-auth"
    hideMenuHamburguer={true}
    colorBody="var(--main-color)"
    classCssBody="flex flex-col items-center"
    renderBody={
      <>
      <img src={logo} alt=""/>
      <div className="w-full h-full flex flex-col px-10 items-center flex-1">
        <Input
        id="login.email"
        name="login.email"
        type="email"
        placeholder="Email"
        classCssContainer="mt-20"
        classCss="input-auth color-auth"
        ref={refEmail}
        events={{
          onChange: (value) => setEmailParam(value)
        }}
        />
        <Input
        id="login.password"
        name="login.password"
        type="password"
        placeholder="Senha"
        classCss="mt-5 input-auth color-auth"
        ref={refPassword}
        events={{}}
        />
        <Button
        classCss="btn-auth"
        type="button"
        action={singIn}
        >
          {isLoading ? <Loading size="30" /> : "Entrar"}
        </Button>
        <div className="flex flex-col justify-center h-full">
          <a href={`/auth/recovery/${emailParam}`}>
            Esqueci minha senha
          </a>
          <a href={`/auth/register/${emailParam}`}>
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