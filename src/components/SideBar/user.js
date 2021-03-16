import React, { useState } from 'react';

import styled from 'styled-components';


const User = ({ user }) => {

    const { name, picture, email, posts, creationDate, likedPosts } = user;

    const [ showDetails, setShowDetails ] = useState(false);
    

    const handleClick = async () => {
        
        //setShowDetails(!showDetails);
        console.log(showDetails);
        
    }

    return (
            <Profile onClick={ ()=> handleClick()}>
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
