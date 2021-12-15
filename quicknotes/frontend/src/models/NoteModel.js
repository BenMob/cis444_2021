import uniqid from 'uniqid'
import sampleNotes from "../samples/notes.json"

class NoteModel {
    constructor(folderId, userId){
        this.id = uniqid()
        this.folderId = folderId
        this.userId = userId
        this.title = ""
        this.content = ""
        this.createdAt = Date.now()
    }

    literal(){
        return {
            id: this.id,
            folderId: this.folderId,
            userId: this.userId,
            title: this.title,
            content: this.content,
            createdAt: this.createdAt
        }
    }

    static getSampleNotes(){
        return sampleNotes;
    }
}

export default NoteModel