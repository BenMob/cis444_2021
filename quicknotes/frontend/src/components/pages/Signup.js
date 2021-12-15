import React from 'react'
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"
import { signup } from '../../tools/authprovider'
import colors from '../../tools/colors'

function Signup({handleGoToLogin, messageHandler, className}) {

    const handleSignUp = () => {
        signup("firstname", "lastname", "username", "email", "pass", messageHandler)
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
                    <h2>New Account</h2>
                    <div><label for="firstname">First Name</label></div>
                    <div><input style={inputBoxStyle} type="text" name="firstname" required/></div>
                    <div><label for="lastname">Last Name</label></div>
                    <div><input style={inputBoxStyle} type="text" name="lastname" required/></div>
                    <div><label for="username">Username</label></div>
                    <div><input style={inputBoxStyle} type="text" name="username" required/></div>
                    <div><label for="email">Email</label></div>
                    <div><input style={inputBoxStyle} type="text" name="email" required/></div>
                    <div><label for="password">Password</label></div>
                    <div><input style={inputBoxStyle} type="password" name="password" required/></div>
                    <div style={buttonsContainerStyle}>
                        <SecondaryButton label={"Login"} onClick={handleGoToLogin} />
                        <PrimaryButton label={"Register"} onClick={handleSignUp} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
