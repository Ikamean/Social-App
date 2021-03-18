import React, { useState } from 'react';
import styled from 'styled-components';

import io from "socket.io-client";

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { FaRegSmileBeam } from 'react-icons/fa';

import { useDispatch } from 'react-redux';

import {  addNewPost } from '../../redux/reducers/postReducer';

import { createPost } from '../../axios/postService';

let socket;

const ENDPOINT =  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_ENDPOINT  : `https://social-app-bitcamp.herokuapp.com/`


const Post = () => {
    const [ postMessage, setPostMessage ] = useState('');

    const [ emoji, setEmoji ] = useState(false);

    const addEmoji = (e) => {
        console.log(e);
        setPostMessage(postMessage.concat(e.native));
    }

    const dispatch = useDispatch();


    let profileObj = localStorage.getItem('user');
    profileObj = JSON.parse(profileObj);
    const { picture, given_name, sub, name } = profileObj && profileObj;


    const handleSubmit = async (e) => {
        e.preventDefault();

        socket = io(ENDPOINT);

        let res = await createPost( postMessage, sub, picture, name );

        socket.emit('createPost', ( res ), () => setPostMessage(''));

        socket.on('newPost', newPost => {
            dispatch(addNewPost(newPost))
        })

        setEmoji(false);
    }

    const handleEnter = (e) => {
        e.key === 'Enter' && handleSubmit(e)
    }

    return (
        <PostContainer>
                <Smile onClick={ ()=>setEmoji(!emoji)}> <FaRegSmileBeam /> </Smile> 
                <EmojiPicker emoji={ emoji } > <Picker onSelect={(e) => addEmoji(e)} /> </EmojiPicker>
            <Form>
                <WritePost onKeyDown={(e)=>handleEnter(e)} message={postMessage} placeholder={`What's on your mind ${given_name}?`} value={postMessage} onChange={ (e) => setPostMessage(e.target.value) } />
                <SendPost message={postMessage} disabled={!postMessage} type='submit' onClick={(e)=>handleSubmit(e)}> Post </SendPost>
            </Form>
        </PostContainer>
    )
}

export default Post

export const PostContainer = styled.div`
    padding: 12px 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.theme.colors.white };
    position: absolute;
    left: 0px;
    right: 0px;
    margin-top: 10px;
    @media(min-width: 650px){
        position: static;
        width: calc( 100vw - 320px);
        margin: 1rem 1rem 1rem 0;
    }
`

export const EmojiPicker = styled.span`
    position: absolute;
    z-index: 1;
    top: 130px;
    display: ${ props => !props.emoji && 'none' };
    @media(min-width: 650px) {
        top: 150px;
        left: 260px;
    }
`
export const Smile = styled.span`
    position: absolute;
    z-index: 1;
    top: 100px;
    left: 10px;
    cursor: pointer;
    
    &:hover {
        opacity: 0.8;
    };

    @media(min-width: 650px) {
        position: static;
        margin-top: 60px;
    }

`

export const Form = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    @media(min-width: 650px){
        width: calc( 100vw - 10px);
    }
`
export const WritePost = styled.textarea`
    padding: 8px 12px;
    border:none;
    min-height: 40px;
    outline: none;
    border-radius: 20px;
    cursor: pointer;
    max-width: 25ch;
    max-height: 90px;
    font-size: ${ props => props.message ? '24px' : '17px' };
    @media( max-width: 460px){
        max-width: 20ch;
    }
    @media( min-width: 900px ){
        max-width: 45ch;
    }
    @media( min-width: 1200px ){
        max-width: 65ch;
    }

`
export const SendPost = styled.button`
    outline: none;
    border: none;
    font-weight: 600;
    padding: 8px;
    border-radius: 6px;
    background-color: ${ props => props.message? props.theme.colors.facebook : props.theme.colors.greyMessage };
    color: ${ props => props.message? props.theme.colors.white : props.theme.colors.grey };
    font-size: 17px;
    cursor : ${ props => props.message && "pointer"};
`