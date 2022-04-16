import { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Template from "../../../components/Template";
import { showToast } from "../../../components/Toast/Toast";
import Login from "../../../types/Login";

import * as authUtils from "../../../utils/auth";

import "../auth.styles.css";

const logo = require("../../../assets/logo.JPG");

const Register = () => {

    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const history = useHistory();
    const { email } = useParams<{ email?: string}>();

    const register = async () => {
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

    const validRepeatPassword = (password : string) => {
        if(password != refPassword.current?.value){

        }
    }

  return (
    <Template
    styleScreen="container-auth color-auth"
    renderHeader={
        <Link to="/auth/login">
            <IoIosArrowBack size={"50"}/>
        </Link>
    }
    styleBody="flex flex-col items-center"
    renderBody={
      <>
      <img src={logo} />
      <div className="w-full h-full flex flex-col px-10 items-center overflow-y-auto">
        <Input
        id="register.email"
        name="register.email"
        type="email"
        placeholder="Email"
        initialValue={email}
        styleContainer="mt-20"
        style="input-auth color-auth"
        ref={refEmail}
        events={{}}
        />
        <Input
        id="register.password"
        name="register.password"
        type="password"
        placeholder="Senha"
        style="mt-5 input-auth color-auth"
        ref={refPassword}
        events={{}}
        />
        <Input
        id="register.repeatPassword"
        name="register.repeatPassword"
        type="password"
        placeholder="Repita a senha"
        style="mt-5 input-auth color-auth"
        events={{}}
        />
        <Button
        style="btn-auth"
        type="button"
        action={register}
        >
          {isLoading ? <Loading size="30" /> : "Registrar"}
        </Button>
      </div>
      </>
    }
    />
  )
}

export default Register