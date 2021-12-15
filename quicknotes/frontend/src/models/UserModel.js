import sampleUser from '../samples/user.json'

class UserModel{

    constructor(token=undefined, id=undefined, fn=undefined, ln=undefined){
        this.token = token
        this.id = id
        this.firstName = fn
        this.lastName = ln
    }

    static getSampleUser(){
        return sampleUser
    }

    literal(){
        return {
            token: this.token,
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}

export default UserModel