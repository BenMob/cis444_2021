import React from 'react'
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"

function Login({handleLogin, handleGoToSignup}) {

    return (
        <div className="w3-animate-top">
            <h1>Login Page</h1>
            <SecondaryButton label={"Create Account"} onClick={handleGoToSignup} />
            <PrimaryButton label={"Login"} onClick={handleLogin} />
        </div>
    )
}

export default Login
