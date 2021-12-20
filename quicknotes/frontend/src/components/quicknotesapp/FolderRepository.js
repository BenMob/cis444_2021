import React from 'react'
import PlusButton from '../buttons/PlusButton'
import Folder from './Folder'

function FolderRepository({folders, openFolder, addFolder, deleteFolder}) {

    const renderFolders = () => {
        return folders.map(folder => {
            return <Folder key={folder.id} onOpen={openFolder} onDelete={deleteFolder} folder={folder} className={"w3-animate-zoom"}/>
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

export default FolderRepository
