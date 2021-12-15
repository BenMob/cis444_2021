import React, {useState, useEffect} from 'react'
import FolderRepository from '../quicknotesapp/FolderRepository'
import NoteRepository from '../quicknotesapp/NoteRepository'
import FolderModel from '../../models/FolderModel'
import {fetchFolders, fetchNotes} from "../../tools/fetch"

const dontShowNotes = {folder: undefined, notes: []}

function Home({user, messageHandler, className}) {
    
    /*--------------------- App States ---------------------*/
    const [folders, setFolders] = useState([])
    const [notes, setNotes] = useState([])
    const [showNotes, setShowNotes] = useState(dontShowNotes) 


    useEffect(() => {
        fetchFolders(user, setFolders, messageHandler)
        fetchNotes(user, setNotes, messageHandler)
    }, [user, messageHandler])

    /*--------------------- Folder handlers ---------------------*/
    /** Handle Adding a folder */
    const handleAddFolder = () => {
        let folderName = window.prompt("Enter Folder Name")
        if(folderName ===  "" || folderName === null) return

        if(folderExists(folderName)){
            messageHandler(`Folder named "${folderName}" aleady exist, please use a different folder name.`, "Oups!")
        }

        const folder = new FolderModel(folderName, user.id)
        setFolders([...folders, folder.literal()])
    }

    /** Handles deleting a folder */
    const handleDeleteFolder = (folder) => {
        const confirmation = window.confirm(`You are about to delete "${folder.name}"`)
        if(!confirmation) return
        const updatedFolders = folders.filter(presentFolder => {
            return presentFolder.id !== folder.id
        })

        setFolders(updatedFolders)
    }

    /** Handles opening a folder */
    const handleOpenFolder = (folder) => {
        const content = notes.filter(note => {
            return note.folderId === folder.id
        })

        setShowNotes({folder: folder, notes: content})
    }

    /** Hides notes and show folder repository */
    const handleShowFolderRepository = () => {
        setShowNotes(dontShowNotes)
    }

    /** Handles checking whether a folder exists */
    const folderExists = (name) => {
        for(let i = 0; i < folders.length; i++) {
            if (folders[i].name === name) return true
        }

        return false
    }

    /*--------------------- Note Handlers ---------------------*/
    const handleAddNoteFromRoot = (note) => {
        setNotes([note, ...notes])
    }

    const handleDeleteNoteFromRoot = (note) => {
        const updatedNotes = notes.filter(presentNote => {
            return presentNote.id !== note.id
        })

        setNotes(updatedNotes)
    }

    
    /*--------------------- Renderers ---------------------*/
    /** Renders Folders */
    const renderFolderRepository = () => {
        return (
            <FolderRepository folders={folders} notes={notes} addFolder={handleAddFolder} deleteFolder={handleDeleteFolder} openFolder={handleOpenFolder}/>
        )
    }

    /** Renders Notes */
    const renderNoteRepository = () => {
        return (
            <NoteRepository user={user} folder={showNotes.folder} folderNotes={showNotes.notes} addNoteFromRoot={handleAddNoteFromRoot} deleteNoteFromRoot={handleDeleteNoteFromRoot} goBack={handleShowFolderRepository}/>
        )
    }

    const homeContainerStyles = {
        width: "75%",
        minHeight: "100%",
    }

    return (
        <div style={homeContainerStyles} className={`w3-margin-top ${className}`}>
            {showNotes.folder === undefined && renderFolderRepository()}
            {showNotes.folder !== undefined && renderNoteRepository()}
        </div>
    )
}

export default Home
