import React, {useState} from 'react'
import {useLongPress} from 'react-use'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder, faTrash} from '@fortawesome/free-solid-svg-icons'
import colors from '../../tools/colors'

function Folder({folder, onOpen, onDelete, className, style}) {

    const [openMouseDownState, setOpenMouseDownState] = useState('')
    const [deleteMouseDownState, setDeleteMouseDownState] = useState('')
    const [showTrash, setShowTrash] = useState(false)

    /* Handlers */
    const handleOpenMouseEvent = (event) => {
        if(event.type === "mousedown"){
            setOpenMouseDownState('w3-opacity')
        }else {
            setOpenMouseDownState('')
        }
    }

    const handleDeleteMouseEvent = (event) => {
        if(event.type === "mousedown"){
            setDeleteMouseDownState('w3-opacity')
        }else{
            setDeleteMouseDownState('')
        }
    }

    const handleOpen = () => {
        if(showTrash) return 
        onOpen(folder)
    }

    const handleDelete = () => {
        if(!showTrash) return
        onDelete(folder)
    }

    const folderContainerStyle = {
        cursor: "pointer",
        width: 90,
        textAlign: "center",
        overflowWrap: "break-word",
        zIndex: 5,
        ...style
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
    const labelStyle = {
        paddingLeft: 5,
        paddingRight: 5
    }

    const trashStyle = {
        zIndex: 6,
        position: "absolute",
        top: 0,
        right: 0,
        cursor: "pointer"
    }

    return (
        <div style={{position: "relative"}} className='folder' {...longPressEvent} onMouseLeave={() => setShowTrash(false)}>
            {showTrash && renderTrash()}
            <div onClick={handleOpen}  className={`w3-pointer ${openMouseDownState} w3-pressed-opacity ${className}`} style={folderContainerStyle} onMouseLeave={handleOpenMouseEvent} onMouseDown={handleOpenMouseEvent} onMouseUp={handleOpenMouseEvent}>
                <FontAwesomeIcon className={`w3-jumbo`} icon={faFolder} style={{color: colors.folderColor}}></FontAwesomeIcon>
                <div style={labelStyle}>{folder.name}</div>
            </div>
        </div>
    )
}

export default Folder
