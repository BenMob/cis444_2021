import uniqid from 'uniqid'

class FolderModel {
    constructor(name){
        this.id = uniqid()
        this.name = name
        this.notes = []
    }

    getName(){
        return this.name
    }

    rename(name){
        this.name = name
    }

    addNote(note){
        if(typeof note !== 'object') return false
        if(!note.hasOwnProperty('id')) return false
        if(!note.hasOwnProperty('title')) return false
        if(!note.hasOwnProperty('content')) return false

        if(this.notes.length === 0){
            this.notes.push(note)
            return true
        }else{
            if(this.notes.includes(n => n.id === note.id)){
                return false
            }

            return true
        }
    }
    
    literal(){
        return {
            id: this.id,
            name: this.name,
            notes: this.notes
        } 
    }
}

export default FolderModel