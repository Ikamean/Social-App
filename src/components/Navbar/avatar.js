import React from 'react';
import styled from 'styled-components';

import { ImArrowUp } from 'react-icons/im';



const AvatarComponent = () => {
    let profileObj = localStorage.getItem('user');
    profileObj = JSON.parse(profileObj);
    const { picture, name } = profileObj && profileObj;

    return (
            profileObj &&
            <AvatarContainer>
            <Avatar>
                <AvatarImg src={picture} alt="userPhoto" width='28px' height='28px' />
            </Avatar>
                <Arrow>
                    <ImArrowUp/>
                </Arrow>
                <HoverName>{ name }</HoverName>
            </AvatarContainer>
    )
}

export default AvatarComponent

const HoverName = styled.div`
    position: absolute;
    left: -80px;
    top: 44px;
    width: 15ch;
    padding: 8px;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 0.789rem;
    font-weight: 800;
    background-color: ${ props => props.theme.colors.navBar.black };
    color: white;
    border-radius: 8px;
    outline:none;
    border: none;
    display: none;
`
const Arrow = styled.div`
    position: absolute;
    top: 35px;
    right: 10px;
    display:none;
    color: black;
`
const AvatarContainer = styled.div`
    display: inline-block;
    position: relative;
    color: ${ props=> props.theme.colors.navBar.white };
    &:hover ${Arrow}, &:hover ${HoverName}{
        display: block;   
    }
`
const Avatar = styled.div`
    width: 28px;
    height: 28px;
`
const AvatarImg = styled.img`
    outline:none;
    border:none;
    border-radius: 4px;
    background-size: 100%;
    display: inline-block;
    &:hover{
        opacity: 0.8;
    }
`