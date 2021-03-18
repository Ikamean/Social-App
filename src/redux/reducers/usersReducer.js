import { getUserList } from '../../axios/userService';

const initialState = {
    "usersList" : [],
    "currentUser" : null
}

const usersReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Users' : 
            state = { ...state, usersList : action.data };
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



export default usersReducer;