import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { verifyToken } from '../axios/loginService';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { initializeAccount } from '../redux/reducers/accountReducer';

import styled from 'styled-components';
import finalLogo from '../media/final.png';
import { FcGoogle } from 'react-icons/fc';


const client_id = process.env.REACT_APP_CLIENT_ID;

const Login = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const onSuccess = async (res) => {
        
        let verification = await verifyToken(res.tokenId);
        localStorage.setItem('user', JSON.stringify(verification));

        await dispatch(initializeAccount(verification));
        // Save Liked Posts into Localstorage when log In
        
    }
    const onFailure = (res) => {
        localStorage.clear();
    }

    return(
        <SingInPage>
            <LogoContainer>

                <a href='https://start.bitcamp.ge/' target='_blank' rel='noreferrer'>
                <Logo src={finalLogo}
                alt="Bitcamp Logo" height="34" />
                </a>

            </LogoContainer>
                <BitcampH1>
                    Login in to Bitcamp 
                </BitcampH1>

            <SingInDetails>
                Continue with the Google account to login.
            </SingInDetails>

            <SingInForm>
                <GoogleForm>
                    <GoogleLogin
                        clientId={client_id}
                        render={renderProps => (
                            <GoogleBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <FcGoogle /> Login
                            </GoogleBtn>
                        )}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        />
                </GoogleForm>
            </SingInForm>
            
        </SingInPage>
    )
}
        

export default Login


const SingInPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 0 40px;
`
const Logo = styled.img`
    border: none;
    outline: none;
    background-color: transparent;
`
const BitcampH1 = styled.h1`
    color: ${ props => props.theme.colors.black };
    font-weight: 700;
    font-size: ${ props => props.theme.fontSizes.big }; 
    line-height: 46px;
    text-align: center;
    letter-spacing: -0.75px;
    margin-bottom: 10px;
    max-width: 700px;
`
const SingInDetails = styled.div`
    font-size: 18px;
    line-height: 27px;
    max-width: 700px;
    color: ${ props => props.theme.colors.singInDetailsGrey };
    text-align: center;
    margin-bottom: 2rem;
`
const SingInForm = styled.div`
    width: 290px;
    padding: 0 12px;
`
const GoogleForm = styled.div`
    margin: 24px auto 0;
`
export const GoogleBtn = styled.button`
    width: 100%;
    cursor: pointer;
    max-width: 100%;
    padding: 0;
    outline: none;
    background-color: '#fff';
    border: 2px solid ${ props => props.theme.colors.google.color };
    color: ${ props => props.theme.colors.google.color };
    font-size: 18px;
    font-weight: 900;
    height: 44px;
    min-width: 96px;
    border-radius: 4px;
    &:hover{
        box-shadow: 0 1px 4px ${ props=> props.theme.colors.google.shadow };
        transition: all 80ms linear;
    }
    &:active{
        border: none;
        background-color: ${ props => props.theme.colors.google.active };
        transition: all 80ms linear;
    }
`
