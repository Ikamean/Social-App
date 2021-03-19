import React from 'react';
import { GoogleLogout } from 'react-google-login';

import io from "socket.io-client";

import { FcGoogle } from 'react-icons/fc';
import { BsFillCircleFill } from 'react-icons/bs';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { logoutAccount } from '../redux/reducers/accountReducer';

import styled from 'styled-components';

const ENDPOINT =  process.env.NODE_ENV === 'development' ? 
process.env.REACT_APP_ENDPOINT  : `https://social-app-bitcamp.herokuapp.com/`


let socket;


const client_id = process.env.REACT_APP_CLIENT_ID;

const Logout = ({ open }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    let profileObj = localStorage.getItem('user');
    profileObj = JSON.parse(profileObj);
    const { picture, name, sub } = profileObj;
    

    const onLogoutSuccess = (res) =>{
        socket = io(ENDPOINT);
        socket.emit('logout', { subID : sub });

        dispatch( logoutAccount() );
        localStorage.clear();
        history.push('/');

        
    }

    return( 
            open &&
            <LogoutContainer>
                <Avatar>
                    <UserImg src={picture} alt='avatar' height='36px' width='36px'/>
                    <ActiveContainer>
                        <ActiveDisplayName>
                            {name}
                        </ActiveDisplayName>

                        <GreenCircleContainer>

                            <GreenCircle>
                                <BsFillCircleFill />
                            </GreenCircle>

                            <ActiveText>Active</ActiveText>

                        </GreenCircleContainer>
                    </ActiveContainer>
                </Avatar>
                <LogoutBtnContainer >
                <GoogleLogout
                    clientId={client_id}
                    render={renderProps => (
                        <LogoutBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <FcGoogle /> Logout
                        </LogoutBtn>
                    )}
                    onLogoutSuccess={onLogoutSuccess}
                    />
                </LogoutBtnContainer>
            </LogoutContainer> 
    )
}

export default Logout

const LogoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 12px 0;
    position: absolute;
    cursor: auto;
    top: 35px;
    left: -270px;
    width: 300px;
    max-width: 360px;
    min-width: 200px;
    background-color: ${ props => props.theme.colors.logout.background };
    box-shadow: 0 0 0 1px #1d1c1d21, 0 4px 12px 0 #1d1c1d;
    border-radius: 6px;
`
const Avatar = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: auto;
    align-items: center;
    padding: 8px 20px 12px 24px;
`
const UserImg = styled.img`
    border-radius: 4px;
    border: none;
    outline: none;
`
const ActiveContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
`
const ActiveDisplayName = styled.span`
    font-weight: 900;
    font-size: 1rem;
    opacity: 0.8;
    color: ${ props => props.theme.colors.black};
`
const GreenCircleContainer = styled.div`
    display: flex;
    width:100%;
    align-items: center;
    padding: 4px 0;
`
const ActiveText = styled.p`
    font-weight: 500;
    opacity: 0.6;
    color: ${ props => props.theme.colors.black};
`
const GreenCircle = styled.span`
    color: ${ props => props.theme.colors.logout.activeCircle };
    font-size: 10px;
    margin-right: 5px;
`

const LogoutBtnContainer = styled.div`
    width: 100%;
    border-top: 1px solid ${ props => props.theme.colors.logout.topBorder};
    padding: 12px  0 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 28px;
    
`
const LogoutBtn = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 5px 0px 5px 24px ;
    font-weight: 600;
    opacity: 0.8;
    text-align: left;
    font-size: 15px;
    width: 100%;
    &:hover {
        background-color:  ${ props => props.theme.colors.logout.blue};
        color: ${ props => props.theme.colors.logout.white};
        text-decoration: none;
    }
`