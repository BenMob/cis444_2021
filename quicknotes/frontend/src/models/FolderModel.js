import uniqid from 'uniqid'
import sampleFolders from "../samples/folders.json"

class FolderModel {
    constructor(name, userId){
        this.id = uniqid()
        this.userId = userId
        this.name = name
        this.createdAt = Date.now()
    }
    
    literal(){
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            createdAt: this.createdAt
        } 
    }

    static getSampleFolders(){
        return sampleFolders
    }
}

export default FolderModel