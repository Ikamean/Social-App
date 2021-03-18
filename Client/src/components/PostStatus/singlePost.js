import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import io from "socket.io-client";

import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import { BsThreeDotsVertical } from 'react-icons/bs';

import { deletePost, likePost, getLikeStateForPost } from '../../axios/postService';
import { useDispatch } from 'react-redux';
import {  removePostDispatcher } from '../../redux/reducers/postReducer';

import PostComments from './postComments/postComments';

let socket;
const ENDPOINT = `https://social-app-bitcamp.herokuapp.com/`

//const ENDPOINT = process.env.REACT_APP_ENDPOINT 


const SinglePost = ({ post }) => {
    const dispatch = useDispatch();
    
    const { authorName, authorPicture, content, creationDate, id, authorId, likes} = post;

    const [ openOptions, setOpenOptions ] = useState(false);

    const loggedUser = JSON.parse(localStorage.getItem('user'));

    const [ updatedPost, setUpdatedPost ] = useState(null);

    const [ likedPost, setLikedPost ] = useState(false);
    
    const isAuthor = authorId === loggedUser.sub;

    const hms = creationDate.split(" ")[4];
    let date = creationDate.split(' ')
    .slice(0,4)
    .join(' ');


    const removePost =  async () => {
        socket = io(ENDPOINT);

        await deletePost(id, authorId);

        socket.emit('removePost', ( id ))

        socket.on('updatePostsAfterRemovingOne', ( { posts } ) => {
            dispatch(removePostDispatcher(posts));
        })

        
    }

    const handleLike = async () => {

        let response = await likePost(  id, loggedUser.sub );
        setUpdatedPost(response.likedPost);

        setLikedPost(response.liked);

    }

    // check if post is allready liked or not, works after reload
    useEffect(() => {
        const getLikeState = async () => {
            let res = await getLikeStateForPost( id, loggedUser.sub );
            setLikedPost(res);
        }

        getLikeState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    



    return (
        <PostContainer>

            <PostAuthor>
                <AuthorAvatar src={authorPicture}  alt='postAuthorPicture' />
                <div>

                    <div>
                        {authorName}
                    </div>
                    
                    <ExactTime>

                        <HoverableTime>
                            {date}
                        </HoverableTime>

                        {hms}

                    </ExactTime>

                </div>
                
            </PostAuthor>


            <PostContent>

                {content}

            </PostContent>

            {
                isAuthor &&

                <OptionsIcon onClick={ () => setOpenOptions(!openOptions) } >

                    <BsThreeDotsVertical /> 

                </OptionsIcon>
            }
            

            <Options open={openOptions} >

                    <DeleteBtn onClick ={ () => removePost() } > Delete Post </DeleteBtn>
                
            </Options>
            <LikeCounterContainer>
                <LikeCounterIcon> <AiOutlineLike /> </LikeCounterIcon> 
                <LikeCounterValue> { updatedPost ? updatedPost.likes : likes } </LikeCounterValue>
            </LikeCounterContainer>
            
            <PostResponse>
                <Reaction liked={likedPost} onClick={ ()=> handleLike()} >

                        <AiFillLike /> 
                        
                        <span> Like </span> 
                    
                </Reaction>

            </PostResponse>
            
            <PostComments post={ post } />
        </PostContainer>
    )
}

export default SinglePost

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
    box-shadow: 0 1px 2px #00000033;
    border: none;
    outline: none;
    border-radius: 4px;
    height: auto;
    width: 100%;
    position: relative;
`
export const PostAuthor = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0.5rem;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
`
export const HoverableTime = styled.div`
    position: absolute;
    display: none;
    top: 1.2rem;
    left: 0.5rem;
    white-space: nowrap;
    background-color: ${ props => props.theme.colors.black };
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 4px;
    color: ${ props => props.theme.colors.white };
    font-weight: 500;
    
`
export const AuthorAvatar = styled.img`
    border-radius: 50%;
    border:none; 
    outline: none;
    width: 40px;
    height: 40px;
    
`

export const ExactTime = styled.div`
    font-size: 13px;
    color: ${ props => props.theme.colors.time };
    position: relative;

    &:hover ${HoverableTime} {
        display: block;
    }
`
export const PostContent = styled.div`
    display: block;
    padding: 4px 16px 16px;
    font-size: 15px;
    word-wrap: break-word;
    text-align: start;
    line-height: 1.6;
`
const OptionsIcon = styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
    font-weight: 900;
    font-size: 18px;
    &:hover {
        color: ${ props => props.theme.colors.facebook }
    }
`
const Options = styled.div`
    display: ${ props => props.open ? 'block' : 'none' };
    position: absolute;
    right: 35px;
    top: 12px;;

`
const DeleteBtn = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    color: #65676b;
    font-weight: 700;
    padding: 0.5rem;
    border-radius:4px;
    &:hover {
        background-color: ${ props => props.theme.colors.facebook };
        color: ${ props => props.theme.colors.white };
    }
`


const PostResponse = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`
const LikeCounterContainer = styled.div`
    display: flex;
    margin-left: 10px;
    margin-bottom: 5px;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 3px;
    font-size: 15px;
`
const LikeCounterIcon = styled.span`
    color: ${ props => props.theme.colors.facebook };
    
    text-align: center;
`
const LikeCounterValue = styled.span`
    font-weight: 600;
    opacity: 0.8;
`

export const Reaction = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 0.8rem 0px;
    border:none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    font-weight: 600;
    font-size: 17px;
    color: #65676b;
    justify-content: center;
    align-items: center;
    color: ${ props => props.liked && props.theme.colors.facebook };

    &:hover {
        color: ${ props => props.liked ?  props.theme.colors.facebook : props.theme.colors.grey };
    };
    
`





