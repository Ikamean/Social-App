import React, { useEffect } from 'react';
import styled from 'styled-components';


import { useDispatch, useSelector } from 'react-redux';

import { initUsersList, initOnlineUsers } from '../../redux/reducers/usersReducer';

import User from './user';


import io from "socket.io-client";

const ENDPOINT =  process.env.NODE_ENV === 'development' ? 
process.env.REACT_APP_ENDPOINT  : `https://social-app-bitcamp.herokuapp.com/`;

let socket;


const Users = () => {
    const dispatch = useDispatch();
    const usersList = useSelector( state => state.users.usersList );

    let loggedUser = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        dispatch(initUsersList());

        socket = io(ENDPOINT);

        socket.on('online', ({ onlineUsers }) => {
            dispatch(initOnlineUsers(onlineUsers))
            console.log(onlineUsers);
        });

        socket.on('userLoggedOut', ({ onlineUsers }) =>{
            dispatch(initOnlineUsers(onlineUsers))
            console.log(onlineUsers);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <UsersListContainer>
                {
                    usersList.map( user => <User key={user.id} user={user} />  )
                }
        </UsersListContainer>

    )
}

export default Users

const UsersListContainer = styled.div`
    position: absolute;
    right: 0px;
    left: 0px;
    top: 200px;
    border: none;
    outline: none;
    gap: 1rem;
    padding: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    @media(min-width: 650px){
        flex-direction: column;
        position: fixed;
        align-items: start;
        left: 0px;
        height: calc(100vh - 100px);
        width: 210px;
        top: 70px;
    }
`
