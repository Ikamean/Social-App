import React from 'react';

import styled from 'styled-components';

import SinglePostComment from './singlePostComment';


const CommentsList = ({ post }) => {


    return (
        <PostCommentsContainer>
            {
                post.comments.map( comment => 
                    <SinglePostComment key={comment.id} comment={comment} />
                )
            }
        </PostCommentsContainer>
    )
}

export default CommentsList

const PostCommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 1rem;
    gap: 10px;
    width: 35ch;
`
