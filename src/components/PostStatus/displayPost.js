import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { initAllPosts } from '../../redux/reducers/postReducer';

import SinglePost from './singlePost';


const DisplayPost = () => {
    const dispatch = useDispatch();
    const posts = useSelector( state => state.content.posts );


    useEffect( () => {

        dispatch(initAllPosts());
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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