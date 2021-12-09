import React from 'react'

function SecondaryButton({label, onClick}) {
    return (
        <button onClick={onClick} className="w3-button w3-round-large w3-border w3-margin-left w3-margin-right w3-small w3-hover-light-gray">{label}</button>
    )
}

export default SecondaryButton
