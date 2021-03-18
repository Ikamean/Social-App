import { getAllPosts } from '../../axios/postService';

const initialState = {
    "posts" : null
}

const postReducer = (state=initialState, action) => {
    switch(action.type){
        case 'Initialize_Posts' : 
            state = { ...state, posts : action.data }
            return state;
        case 'Update_Post_Comments' :
            let posts = state.posts;
            let updatedPost = action.data;
            posts = posts.map( post => post.id !== updatedPost.id ? post : updatedPost );
            state = { ...state, posts: posts }
            return state;
        case 'New_Post' :
            state = {...state, posts : state.posts.concat(action.data) }
            return state;
        case 'Remove_Post' :
            state = { ...state, posts: action.data }
            return state;
        default : return state
    }
}




export const initAllPosts = () => {
    return async dispatch => {
        let value = await getAllPosts();
    
        dispatch({
            type: 'Initialize_Posts',
            data: value
        })
    }
}

export const addNewPost = ({ newPost }) => {
    return dispatch => {
        dispatch({
            type: 'New_Post',
            data: newPost
        })
    }
}

export const updatePostComments = (updatedPost) => {
    return dispatch => {
        dispatch({
            type: 'Update_Post_Comments',
            data: updatedPost
        })
    }
}

export const removePostDispatcher = (payload) => {
    return dispatch => {
        dispatch({
            type: 'Remove_Post',
            data: payload
        })
    }
}



export default postReducer