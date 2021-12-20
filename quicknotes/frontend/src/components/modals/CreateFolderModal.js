import React, {useState} from 'react'
import colors from '../../tools/colors'
import FolderModel from '../../models/FolderModel'
import SecondaryButton from '../buttons/SecondaryButton'
import PrimaryButton from '../buttons/PrimaryButton'

function CreateFolderModal({user, existingFolders, commitFolder, hideModal, messageHandler}) {
    
    const [newFolderName, setNewFolderName] = useState("")

    /** Handles adding folder */
    const handleAddFolder = () => {
        if(newFolderName ===  "" || newFolderName === null || newFolderName === undefined) return

        if(folderExists(newFolderName)){
            messageHandler(`Folder named "${newFolderName}" aleady exist, please use a different folder name.`, "Oups!")
            return
        }

        const folder = new FolderModel(newFolderName, user.id)
        commitFolder(folder.literal())
        hideModal()
    }

    /** Handles cancel adding folder */
    const handleCancel = () => {
        hideModal();
    }

    /** Handles checking whether a folder exists */
    const folderExists = (name) => {
        for(let i = 0; i < existingFolders.length; i++) {
            if (existingFolders[i].name === name) return true
        }

        return false
    }

    /** Handles changes in the input box */
    const updateNewFolderName = (event) => {
        setNewFolderName(event.target.value)
    }

    const modalContainerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        background:"rgba(0,0,0,0.6)",
        zIndex: 5,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const modal = {
        background: colors.primaryBg,
        borderRadius: 5,
        padding: 20,
        margin: 10,
        border: `solid 2px  ${colors.noteColor}`
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

    const buttonsContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "30px 0px 30px 0px"
    }

    return (
        <div style={modalContainerStyle}>
            <div style={modal} className='w3-card-4'>
                <div>
                    <p>Enter Folder Name:</p>
                    <input style={inputBoxStyle} type="text" name="username" value={newFolderName} onChange={updateNewFolderName} required/>
                </div>
                <div style={buttonsContainerStyle}>
                    <SecondaryButton label={"Cancel"} onClick={handleCancel} />
                    <PrimaryButton label={"Ok"} onClick={handleAddFolder} />
                </div> 
            </div>
        </div>
    )
}

export default CreateFolderModal
