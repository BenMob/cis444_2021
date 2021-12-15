import React, {useState} from 'react'
import {useLongPress} from 'react-use'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import colors from '../../tools/colors'

function Note({note, onDelete, className, style}) {

    const [deleteMouseDownState, setDeleteMouseDownState] = useState('')
    const [showTrash, setShowTrash] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    /* Handlers */
    const handleDeleteMouseEvent = (event) => {
        if(event.type === "mousedown"){
            setDeleteMouseDownState('w3-opacity')
        }else{
            setDeleteMouseDownState('')
        }
    }

    /** Handles title change */
    const handleTitleChangeEvent = (event) => {
        setTitle(event.target.value)
    }

    /** Handles content change */
    const handleContentChangeEvent = (event) => {
        setContent(event.target.value)
    }

    const handleDelete = () => {
        if(!showTrash) return
        onDelete(note)
    }

    const noteContainerStyle = {
        cursor: "pointer",
        width: 200,
        height: 200,
        overflowWrap: "break-word",
        zIndex: 5,
        background: colors.noteColor,
        color: "#000",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        ...style
    }

    const noteTitleContainer = {
        textAlign: "center",
        border: "none",
        background: colors.noteColor,
        overflowWrap: "break-word"
    }

    const noteContentContainer = {
        textAlign: "justify",
        border: "none",
        padding: 3,
        fontSize: 12,
        background: colors.noteColor,
        overflowWrap: "break-word",
        resize: "none",
    }

    const renderTrash = () => {
        return (
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} style={trashStyle} className={`${deleteMouseDownState}`} onMouseLeave={handleDeleteMouseEvent} onMouseDown={handleDeleteMouseEvent} onMouseUp={handleDeleteMouseEvent}/>
        )
    }

    /* Handle Long Presses On the Folder */
    const onLongPress = () => {
        setShowTrash(true)
    }

    const longPressEvent = useLongPress(onLongPress, {isPreventDefault: true, delay: 700})
    const trashStyle = {
        zIndex: 6,
        position: "absolute",
        top: 0,
        right: 0,
        cursor: "pointer",
    }

    return (
        <div style={{position: "relative"}} className='note' {...longPressEvent} onMouseLeave={() => setShowTrash(false)}>
            {showTrash && renderTrash()}
            <div style={noteContainerStyle} className={`w3-margin w3-card-4 ${className}`}>
                <input style={noteTitleContainer} className="w3-hover-yellow" type={"text"} value={title} onChange={handleTitleChangeEvent} />
                <textarea style={noteContentContainer} className="w3-hover-yellow" type="text" value={content} onChange={handleContentChangeEvent} />
            </div>
        </div>
    )
}

export default Note
