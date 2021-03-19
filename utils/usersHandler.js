let loggedUsers = [];

const addUser = (subID) => {

    let allreadyInTheList = loggedUsers.includes(subID)

    if(!allreadyInTheList){
        loggedUsers = [ ...loggedUsers, subID ];
    }
    

    return loggedUsers

}

const removeUser = (subID, users ) => {
    users = users.filter( id => id !== subID)
    
    return users;
}

module.exports= { addUser, removeUser }