import React from 'react'
import PlusButton from '../buttons/PlusButton'
import FolderButton from '../buttons/FolderButton'

function FolderList({folders, openFolder, addFolder, deleteFolder}) {

    const renderFolders = () => {
        return folders.map(folder => {
            return <FolderButton key={folder.id} onOpen={openFolder} onDelete={deleteFolder} id={folder.id} name={folder.name} className={"w3-animate-zoom"}/>
        })
    }

     const folderListContainer = {
        display: "flex",
        flexWrap: "wrap"
    }

    return (
        <div style={folderListContainer}>
            {folders.length !== 0 && renderFolders()}
            <PlusButton onClick={addFolder} style={{width: 90, height: 70}} className={"w3-animate-zoom"}/>
        </div>
    )
}

export default FolderList
