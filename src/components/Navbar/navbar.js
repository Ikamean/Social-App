import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../../media/bitcampLogo.png';

import { useHistory } from 'react-router-dom';

import AvatarComponent from './avatar';
import Logout from '../logout';






const NavBar = () => {

    const [ open, setOpen ] = useState(false);

    const history= useHistory();

    return (
        <Navbar>
                <HomeBtn onClick={ ()=>history.push('/')}>
                    <HomeLogo src={Logo} alt='logo' />
                </HomeBtn>
                
                <Header>
                    Bitcamp
                </Header>
            
            <UserPhotoContainer>
                { 
                    <UserPhotoBtn onClick={ () => setOpen(!open) }>

                        <AvatarComponent />
                        <Logout open={open} />

                    </UserPhotoBtn>
                }
                
            </UserPhotoContainer>
        </Navbar>
    )
}

export default NavBar

const Navbar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    background-color: ${ props=> props.theme.colors.white };
    color: ${ props=> props.theme.colors.navBar.black };
    position: sticky;
    top: 0;
    z-index: 1;
`
const HomeBtn = styled.button`
    position: absolute;
    padding: 0;
    left: 25px;
    top: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 1;
    &:hover{
        opacity: 0.9;
    }
`
const HomeLogo = styled.img`
    cursor: pointer;
`
const Header = styled.h1`
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 15px;
    font-weight: 900;
`
const UserPhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: auto;
    padding-right: 1rem;
    min-width: 128px;
`

const UserPhotoBtn = styled.div`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    align-items: center;
    padding: 2px 0 2px 0;
    position: relative;
`