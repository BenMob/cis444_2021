import React, {useState} from 'react'
import FolderList from '../quicknotesapp/FolderList'
import FolderModel from '../../models/FolderModel'



function Home({user ,className}) {

    /* Folders */
    const [folders, setFolders] = useState([])

    /*--------------------- Handles Adding Folder ---------------------*/
    const handleAddFolder = () => {
        let folderName = prompt("Enter Folder Name")
        if(folderName ===  "" || folderName === null) return

        while(folderExists(folderName)){
            folderName = window.prompt(`Folder named "${folderName}" aleady exist, please enter a different folder name`)
            if(folderName ===  "" || folderName === null) return
        }

        const folder = new FolderModel(folderName)
        setFolders([...folders, folder.literal()])
    }

    /*--------------------- Handles Deleting a folder ------------------------- */
    const handleDeleteFolder = (id, name) => {
        const confirmation = window.confirm(`You are about to delete "${name}"`)
        if(!confirmation) return
        const updatedFolders = folders.filter(folder => {
            return folder.id !== id
        })

        setFolders(updatedFolders)
    }

    /*--------------------- Handles Opening a Folder ---------------------*/
    const handleOpenFolder = (name) => {
        window.alert("Ready to open folder " + name)
    }

    /*--------------------- Utility function to check if folder already exists ---------------------*/
    const folderExists = (name) => {
        for(let i = 0; i < folders.length; i++) {
            if (folders[i].name === name) return true
        }

        return false
    } 

    const homeContainerStyles = {
        width: "65%",
        height: "100%",
    }

    return (
        <div style={homeContainerStyles} className={`w3-margin-top w3-container ${className}`}>
            <FolderList folders={folders} addFolder={handleAddFolder} deleteFolder={handleDeleteFolder} openFolder={handleOpenFolder}/>
        </div>
    )
}

export default Home
