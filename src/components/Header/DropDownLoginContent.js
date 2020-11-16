import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

import api from "../../services/api";

export default function DropDownLoginContent(props) {
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");

    function handleClickAway() {
        props.setClickLogin(false);
    }

    async function Login() {
        try {
            const response = await api.post("login", { User, Password });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(User, "<- User|| Password -> ", Password);
        console.log("AAAAAAAA");
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                className="drop_content"
                style={{
                    border: "solid 0.5px #ccc",
                    borderRadius: "10px",
                    width: "300px",
                    height: "200px",
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: "23px",
                    right: "0px",
                }}
            >
                <div
                    className="title_login"
                    style={{
                        width: "100%",
                        backgroundColor: "#ccc",
                        height: "fit-content",
                        textAlign: "center",
                        borderRadius: "10px 10px 0 0",
                        padding: "10px 0",
                        color: "black",
                    }}
                >
                    LOGIN
                </div>
                <div
                    className="inputs"
                    style={{
                        width: "80%",
                        color: "black",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        padding: "10px 0",
                    }}
                >
                    USUÁRIO
                    <input
                        className="input_login"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            width: "95%",
                            borderRadius: "15px",
                            border: "solid 1px #ccc",
                        }}
                        type="text"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                    />
                    SENHA
                    <input
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            width: "95%",
                            borderRadius: "15px",
                            border: "solid 1px #ccc",
                        }}
                        className="input_password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div
                    className="buttons"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "80%",
                        margin: "auto",
                    }}
                >
                    <button
                        className="b_login"
                        onClick={() => Login()}
                        /*   style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            width: "fit-content",
                            padding: "auto",
                        }} */
                        style={{
                            margin: "auto",
                            width: "fit-content",
                            color: "black",
                            marginBottom: "10px",
                            backgroundColor: "#AFC6FF",
                            padding: "5px 20px",
                            borderRadius: "15px",
                            border: "0",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        ACESSAR
                    </button>

                    <button
                        className="b_register"
                        /*  style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            width: "fit-content",
                            padding: "auto",
                        }} */
                        style={{
                            margin: "auto",
                            width: "fit-content",
                            color: "black",
                            marginBottom: "10px",
                            backgroundColor: "#AFC6FF",
                            padding: "5px 20px",
                            borderRadius: "15px",
                            border: "0",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        CADASTRAR
                    </button>
                </div>
                <a
                    href={"/forgetPassword"}
                    style={{
                        margin: "0 10px",
                        color: "#666",
                    }}
                >
                    Esqueceu sua senha?
                </a>
            </div>
        </ClickAwayListener>
    );
}
