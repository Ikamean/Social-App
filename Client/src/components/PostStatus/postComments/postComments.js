import React, { useState } from 'react';

import styled from 'styled-components';

import { Reaction } from '../singlePost';

import { FaRegCommentAlt } from 'react-icons/fa';


import CommentsForm from './commentsForm';
import CommentsList from './commentsList';

const PostComments = ({ post }) => {
    const [ openComments, setOpenComments ] = useState(false);

    const handleComments = async () => {
        setOpenComments(!openComments);
    }

    const commentsLength = post.comments.length

    return (
        <CommentsContainer>
            <Reaction onClick={()=> handleComments()}>
                        <FaRegCommentAlt /> <span> {commentsLength} Comment  </span> 
            </Reaction>
            <Comments open={openComments}>
                <CommentsList post={post} />
                <CommentsForm post={post} />
            </Comments>
        </CommentsContainer>
    )
}

export default PostComments

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const Comments = styled.div`
    display: ${ props => props.open ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
    padding: 4px 16px 16px;
`