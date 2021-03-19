import { getUserList } from '../../axios/userService';

const initialState = {
    "usersList" : [],
    "onlineUsers" : []
}

const usersReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Users' : 
            state = { ...state, usersList : action.data };
            return state;
        case 'Online_users' :
            state = { ...state, onlineUsers : action.data };
            return state;
        default : return state;
    }
}


export const initUsersList = () => {
    return async dispatch => {
        let value = await getUserList();
            dispatch({
            type: 'Initialize_Users',
            data: value
        })
    }
}

export const initOnlineUsers = (onlineUsers) => {
    return async dispatch => {
        dispatch({
            type: 'Online_users',
            data: onlineUsers
        })
    }
}



export default usersReducer;