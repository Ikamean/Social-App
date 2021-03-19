import React, { useEffect } from 'react';
import styled from 'styled-components';

import io from "socket.io-client";



import { useDispatch, useSelector } from 'react-redux';

import { initAllPosts, addNewPost, removePostDispatcher, updatePostComments } from '../../redux/reducers/postReducer';

import SinglePost from './singlePost';


let socket;

const ENDPOINT =  process.env.NODE_ENV === 'development' ? 
process.env.REACT_APP_ENDPOINT  : `https://social-app-bitcamp.herokuapp.com/`;


const DisplayPost = () => {
    const dispatch = useDispatch();
    const posts = useSelector( state => state.content.posts );
    

    useEffect( () => {

        socket=io(ENDPOINT);
        
        const postsOperationsHandler = async () => {

            await dispatch(initAllPosts());

            await socket.on('newPost', newPost => {

                console.log('dispatching post',newPost);
                dispatch(addNewPost(newPost))
            });

            await socket.on('removedPostId', ( { removedPostId } ) => {
                dispatch(removePostDispatcher(removedPostId));
            })

            await socket.on('updatedPostWithComments', ( { post } ) => {
                
                dispatch(updatePostComments(post));
                
            })
        }
        
        postsOperationsHandler();

        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    return (
        <PostContainer>
            {
                posts && posts.map( p => <SinglePost  key={p.id} post={p} /> )
            }
        </PostContainer>
    )
}

export default DisplayPost

const PostContainer = styled.div`
    position: absolute;
    top: 350px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
    padding: 1rem 0;
    @media(min-width: 650px){
        position: static;
        width: calc( 100vw - 300px);
        margin: 1rem 1rem 1rem 0;
    }
`