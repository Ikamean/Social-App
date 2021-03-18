import React from 'react';
import styled from 'styled-components';

import PostInput from '../components/PostStatus/createPost';
import DisplayPost from '../components/PostStatus/displayPost';

import UsersList from '../components/SideBar/usersList';

const HomePage = () => {

    return (
        <Home>  
            <PostInput />
            <UsersList />
            <DisplayPost />
        </Home>
    )
}

export default HomePage

const Home = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
`
