import UserModel from "../models/UserModel"

const login = (username, password, onSuccess, onFailure) => {
    onSuccess(UserModel.getSampleUser())
}

const signup = (firstname, lastname, username, email, password, messageHandler) => {
    messageHandler("I can't believe you are trying to create an account and you haven't even attached a backend to this app.", "Bruh!!!")
}

const isLoggedIn = (user) => {
    return (
        user.token !== undefined &&
        user.id !== undefined &&
        user.firstName !== undefined &&
        user.lastName !== undefined
    )    
}

export {
    login,
    signup,
    isLoggedIn
}