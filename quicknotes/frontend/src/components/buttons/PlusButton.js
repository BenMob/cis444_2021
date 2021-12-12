import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

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
			<FontAwesomeIcon icon={faPlus} onClick={onClick} onMouseDown={handleMouseEvent} onMouseUp={handleMouseEvent} onMouseLeave={handleMouseEvent} className={`w3-circle w3-xxlarge ${mouseDownState}`} style={{cursor: "pointer"}}/>
		</div>
	)
}

export default PlusButton

