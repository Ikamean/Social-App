let loggedUsers = [];

const addUser = (subID) => {

    let allreadyInTheList = loggedUsers.includes(subID)

    if(!allreadyInTheList){
        loggedUsers = [ ...loggedUsers, subID ];
    }
    

    return loggedUsers

}

const removeUser = (subID) => {
    loggedUsers = loggedUsers.filter( id => id==!subID)

    return loggedUsers;
}

module.exports= { addUser, removeUser }