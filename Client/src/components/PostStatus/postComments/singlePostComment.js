import React from 'react';
import styled from 'styled-components';

import { PostAuthor, ExactTime, HoverableTime, PostContent, AuthorAvatar } from '../singlePost';

const SinglePostComment = ({ comment }) => {
    const { content, authorName, authorPicture, createdTime } = comment;

    
    const hms = createdTime.split(' ')[4]
    let date = createdTime.split(' ')
    .slice(0,4)
    .join(' ');


    return (
        <CommentContainer>

            <PostAuthor>
                <AuthorAvatar src={authorPicture}  alt='postAuthorPicture' />
                <div>

                    <div>
                        {authorName}
                    </div>
                    
                    <ExactTime>
                            {hms}
                        <HoverableTime>
                            {date}
                        </HoverableTime>
                            
                        

                    </ExactTime>

                </div>
                
            </PostAuthor>


            <PostContent>

                {content}

            </PostContent>
        </CommentContainer>
    )
}

export default SinglePostComment;

const CommentContainer = styled.div`

`
