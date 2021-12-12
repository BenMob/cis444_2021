import React, {useState} from 'react'

function PlusButton({onClick, className, style}) {

	const [mouseDownState, setMouseDownState] = useState('')

    const handleMouseEvent = (event) => {
        if(event.type === "mousedown"){
            setMouseDownState('w3-opacity')
        }else {
            setMouseDownState('')
        }
    }


	const containerStyles = {
        display: "grid",
		placeItems: "center",
		...style
	}

	return (
		<div style={containerStyles} className={className}>
			<button onClick={onClick} onMouseDown={handleMouseEvent} onMouseUp={handleMouseEvent} onMouseLeave={handleMouseEvent} className={`w3-button w3-circle w3-border w3-light-gray w3-hover-light-gray  ${mouseDownState}`}><strong >+</strong></button>
		</div>
	)
}

export default PlusButton

