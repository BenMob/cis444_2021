import React from 'react'
import {login} from '../../tools/authprovider'
import colors from '../../tools/colors'
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"

function Login({handleGoToHome, handleGoToSignup, messageHandler, className}) {

    const handleLogin = () => {
        login("username", "pass", handleGoToHome, messageHandler)
    }

    const containerStyle = {
        borderRadius: 5,
        padding: 20,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        border: `solid 2px  ${colors.noteColor}`
    }

    const buttonsContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "30px 0px 30px 0px"
    }

    const inputBoxStyle = {
        background: colors.white,
        padding: 5,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        width: 250,
        border: `solid 2px  ${colors.noteColor}`
    }

    return (
        <div style={containerStyle} className={`w3-card-4 ${className}`}>
            <div>
                <div>
                    <h2>Login</h2>
                    <div><label for="username">Username</label></div>
                    <div><input style={inputBoxStyle} type="text" name="username" required/></div>
                    <div><label for="password">Password</label></div>
                    <div><input style={inputBoxStyle} type="password" name="password" required/></div>
                    <div style={buttonsContainerStyle}>
                        <SecondaryButton label={"Create Account"} onClick={handleGoToSignup} />
                        <PrimaryButton label={"Login"} onClick={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
