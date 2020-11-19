import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

import api from "../../../services/api";

export default function DropDownLoginContent(props) {
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");

    function handleClickAway() {
        props.setClickLogin(false);
    }

    async function handleLogin(e) {
        e.preventDefault();

        handleClickAway();

        try {
            const response = await api.post("login", {
                email: User,
                password: Password,
            });

            console.log(response, "o response");

            localStorage.setItem("accessToken", response.data.accessToken);

            const user = response.data.user[0];

            console.log(user);

        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="drop_content">
                <div className="title_login">LOGIN</div>
                <div className="inputs">
                    USUÁRIO
                    <input
                        className="input_login"
                        type="text"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                    />
                    SENHA
                    <input
                        className="input_password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="buttons">
                    <button className="b_login" onClick={(e) => handleLogin(e)}>
                        ACESSAR
                    </button>

                    <button className="b_register">CADASTRAR</button>
                </div>
                <a className="forgetPassword" href={"/forgetPassword"}>
                    Esqueceu sua senha?
                </a>
            </form>
        </ClickAwayListener>
    );
}
