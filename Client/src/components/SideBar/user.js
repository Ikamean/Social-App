import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { GrStatusGoodSmall } from 'react-icons/gr';

import styled from 'styled-components';




const User = ({ user }) => {
    const onlineUsers = useSelector( state => state.users.onlineUsers );
    
    const { name, picture, email, posts, creationDate, likedPosts, subID } = user;

    const [ showDetails, setShowDetails ] = useState(false);

    const [ online, setOnline ] = useState(false);
    

    const handleClick = async () => {
        
    }

    useEffect(()=>{
        const isOnline = onlineUsers.includes(subID);
        setOnline(isOnline);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[onlineUsers])

    



    return (
            <Profile onClick={ ()=> handleClick()}>
                {
                    online && 
                    <OnlineStatusIcon >
                        <GrStatusGoodSmall />
                    </OnlineStatusIcon>
                }
                
                    
                    <UserPicture src={picture} />
                <UserName>
                    {name}
                </UserName>
                <DetailsContainer show={showDetails}>
                    <ProfilePicture src={picture} />
                    {email}
                    {name}
                </DetailsContainer>
            </Profile>
    )
}

export default User

const Profile = styled.div`
    //padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    @media(min-width: 650px){
        flex-direction: row;
        justify-content: flex-start;
    }
    position: relative;
`
const OnlineStatusIcon = styled.span`
    position: absolute;
    color: ${ props => props.theme.colors.green };
    top: 0;
    left: 0;
    font-size: 15px;
`
const UserName = styled.div`
    display: block;
    white-space: nowrap;
    width: auto;
    font-size: 15px;
    font-weight: 900;
    opacity: 0.8;
    color: ${ props => props.theme.colors.black };
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
`

const UserPicture = styled.img`
    height: 60px;
    width: 60px;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 0 1px 2px ${ props => props.theme.colors.boxShadow };
    border: none;
    outline:none;
    border-radius: 50%;
    @media(min-width: 650px){
        flex-direction: row;
        height: 40px;
        width: 40px;
    }
`
const DetailsContainer = styled.div`
    display: ${ props => props.show ? 'flex' : 'none'};
    position: absolute;
    flex-direction: column;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    padding: 1rem;
`
const ProfilePicture = styled.img`
    width: 120px;
    height: 120px;
    border: none;
    outline: none;
    border-radius: 4px;
`
