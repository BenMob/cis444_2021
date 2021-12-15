import sampleFolders from "../samples/folders.json"
import sampleNotes from "../samples/notes.json"

const fetchFolders = (user, onSuccess, onFailure) => {
    onSuccess(sampleFolders)
}

const fetchNotes = (user, onSuccess, onFailure) => {
    onSuccess(sampleNotes)
}

export {
    fetchFolders,
    fetchNotes
}