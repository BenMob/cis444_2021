import React, {useState, useEffect} from 'react'
import FolderRepository from '../quicknotesapp/FolderRepository'
import NoteRepository from '../quicknotesapp/NoteRepository'
import CreateFolderModal from '../modals/CreateFolderModal'
import {fetchFolders, fetchNotes} from "../../tools/fetch"

const dontShowNotes = {folder: undefined, notes: []}

function Home({user, messageHandler, className}) {
    
    /*--------------------- App States ---------------------*/
    const [folders, setFolders] = useState([])
    const [notes, setNotes] = useState([])
    const [showNotes, setShowNotes] = useState(dontShowNotes)
    const [createFolder, setCreateFolder] = useState(false)

    useEffect(() => {
        fetchFolders(user, setFolders, messageHandler)
        fetchNotes(user, setNotes, messageHandler)
    }, [user, messageHandler])

    /*--------------------- Folder handlers ---------------------*/
    /** Handle Adding a folder */
    const handleAddFolder = (folder) => {
        setFolders([...folders, folder]) 
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
            <FolderRepository folders={folders} notes={notes} addFolder={showCreateFolderModal} deleteFolder={handleDeleteFolder} openFolder={handleOpenFolder}/>
        )
    }

    /** Renders Notes */
    const renderNoteRepository = () => {
        return (
            <NoteRepository user={user} folder={showNotes.folder} folderNotes={showNotes.notes} addNoteFromRoot={handleAddNoteFromRoot} deleteNoteFromRoot={handleDeleteNoteFromRoot} goBack={handleShowFolderRepository}/>
        )
    }

    /**------------------ Create Folder Modal ---------------- */
    const renderCreateFolderModal = () => {
        return (
            <CreateFolderModal user={user} existingFolders={folders} commitFolder={handleAddFolder} hideModal={hideCreateFolderModal} messageHandler={messageHandler}/>
        )
    }

    const showCreateFolderModal = () => {
        setCreateFolder(true)
    }

    const hideCreateFolderModal = () => {
        setCreateFolder(false)
    }

    const homeContainerStyles = {
        width: "75%",
        minHeight: "100%",
    }

    return (
        <div style={homeContainerStyles} className={`w3-margin-top ${className}`}>
            {createFolder && renderCreateFolderModal()}
            {showNotes.folder === undefined && renderFolderRepository()}
            {showNotes.folder !== undefined && renderNoteRepository()}
        </div>
    )
}

export default Home
