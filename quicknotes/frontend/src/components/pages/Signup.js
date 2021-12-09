import React from 'react'
import PrimaryButton from "../buttons/PrimaryButton"
import SecondaryButton from "../buttons/SecondaryButton"

function Signup({handleSignup, handleGoToLogin}) {
    return (
        <div className="w3-animate-top">
            <h1>Signup Page</h1>
            <SecondaryButton label={"Login"} onClick={handleGoToLogin} />
            <PrimaryButton label={"Register"} onClick={handleSignup} />
        </div>
    )
}

export default Signup
