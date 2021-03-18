import axios from 'axios';



export const likePost = async ( postId, loggedUserId  ) => {
    let res = await axios({
        method: 'post',
        url: `api/post/likes/${postId}`,
        data: {
            loggedUserId: loggedUserId
        }
    })

    return res.data
};

export const commentPost = async ( postId, comment, loggedUserId, loggedUserPicture, loggedUserName ) => {
    let res = await axios({
        method: 'post',
        url: `api/post/comments/${postId}`,
        data: {
            comment: comment,
            loggedUserId : loggedUserId,
            loggedUserPicture: loggedUserPicture,
            loggedUserName: loggedUserName,
            
        }
    })

    return res.data;
}


export const createPost = async (content, subId, picture, name) => {

    let res = await axios({
        method: 'post',
        url: `api/post`,
        data: {
            content: content,
            authorId: subId,
            authorPicture: picture,
            authorName: name
        }
    });
    

    return res.data
}

export const getAllPosts = async () => {
    let posts = await axios.get( `api/post` );


    return posts.data
}

export const getLikeStateForPost = async (postId, loggedUserId) => {
    let res = await axios.get(`api/post/${postId}`, { params : { loggedUserId : loggedUserId }});
    return res.data;
}

export const deletePost = async ( postId, authorId ) => {
    let res = await axios({
        method: 'delete',
        url: `api/post`,
        data: {
            id: postId,
            authorId: authorId
        }
    })

    return res;
}
