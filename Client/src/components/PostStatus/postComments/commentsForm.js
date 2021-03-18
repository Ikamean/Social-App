import React, { useState } from 'react';

import styled from 'styled-components';

import io from "socket.io-client";

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { FaRegSmileBeam } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';

import { commentPost } from '../../../axios/postService';

import { updatePostComments } from '../../../redux/reducers/postReducer';

import { useDispatch } from 'react-redux';

let socket;
const ENDPOINT = process.env.REACT_APP_ENDPOINT 
//const ENDPOINT ='https://bitcamp-social-app.herokuapp.com';


const CommentsForm = ({ post }) => {
    const dispatch = useDispatch();

    const { id } = post;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    
    const { sub, picture, name } = loggedUser;

    const [ comment, setComment ] = useState('');
    const [ emoji, setEmoji ] = useState(false);

    const addEmoji = (e) => {
        setComment(comment.concat(e.native));
    }

    const handleInput = (e) => {
        setComment(e.target.value)
    }


    const handleSubmit = async  (e) => {
        e.preventDefault();

        socket = io(ENDPOINT);

        let res = await commentPost( id, comment, sub, picture, name );

        socket.emit('postComment', { updatedPostWithComments : res }, () => setComment(' '));

        socket.on('updatedPostWithComments', ( { post }  ) => {
            dispatch(updatePostComments(post.updatedPostWithComments));
        })


        setEmoji(false);

    }

    const handleEnter = (e) => {
        e.key === 'Enter' && handleSubmit(e)
    }

    return (
        <CommentContainer>
            <Smile onClick={ ()=>setEmoji(!emoji)} > < FaRegSmileBeam /> </Smile>
            <EmojiPicker emoji={emoji}> <Picker onSelect={ (e)=> addEmoji(e) } /> </EmojiPicker> 
        <CommentForm>

            <Input placeholder='type comment here' onKeyDown={(e)=>handleEnter(e)} value={comment} onChange={ (e) => handleInput(e) } />

            <Submit comment={comment} type='submit' onClick={(e)=> handleSubmit(e) }  disabled={!comment}> 

                <AiOutlineSend />

            </Submit>

        </CommentForm>

        </CommentContainer>
    )
}

export default CommentsForm;

const CommentContainer = styled.div`
    position: relative;
`
const Smile = styled.span`
    position: absolute;
    bottom: 1rem;
    left: 0.5rem;
    cursor: pointer;
    &:hover{
        color: ${ props=> props.theme.colors.facebook }
    }
`
const EmojiPicker = styled.div`
    display: ${ props => props.emoji ? "block" : "none" };
    position: absolute;

    bottom: 50px;
`

const CommentForm = styled.form`
    margin: 10px 0px 0px;
    width: 100%;
    display: flex;
`

const Input = styled.textarea`
    padding: 8px  2rem;
    outline: none;
    border: none;
    min-height: 30px;
    max-height: 30px;
    outline: none;
    border-radius: 20px;
    cursor: pointer;
    max-width: 40ch;
    min-width: 40ch;
    font-size: ${ props => props.message ? '24px' : '17px' };
    @media( max-width: 460px){
        max-width: 25ch;
        min-width: 25ch;
    }
    @media (min-width: 650px){
        max-width: 30ch;
        min-width: 30ch;
    }
    @media( min-width: 900px ){
        max-width: 55ch;
        min-width: 55ch;
    }
    @media( min-width: 1200px ){
        max-width: 75ch;
        min-width: 75ch;
    }
`

const Submit = styled.button`
    border: none;
    outline: none;
    height: 46px;
    padding: 16px;
    border-radius: 4px;
    background-color: ${ props => props.comment? props.theme.colors.facebook : props.theme.colors.greyMessage };
    color: ${ props => props.comment? props.theme.colors.white : props.theme.colors.grey };
    font-size: 17px;
    display: flex;
    align-items: center;
    cursor : ${ props => props.comment && "pointer"};
`