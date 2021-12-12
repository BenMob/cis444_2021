import React from 'react'

function SecondaryButton({label, onClick, className, styles}) {
    const containerStyles = {
		...styles
	}

    return (
        <button styles={containerStyles} onClick={onClick} className={`w3-button w3-round-large w3-border w3-margin-left w3-margin-right w3-small w3-hover-light-gray ${className}`}>{label}</button>
    )
}

export default SecondaryButton
