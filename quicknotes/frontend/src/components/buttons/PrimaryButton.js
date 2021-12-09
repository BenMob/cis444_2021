import React from 'react'

function PrimaryButton({label, onClick, className}) {
    return (
         <button onClick={onClick} className={`w3-button w3-light-gray w3-round-large w3-border w3-small w3-hover-green w3-margin-left ${className}`}>{label}</button>
    )
}

export default PrimaryButton
