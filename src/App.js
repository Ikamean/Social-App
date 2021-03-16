import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'

import { useSelector } from 'react-redux';

import Login from './components/login';

import Navbar from './components/Navbar/navbar';

import HomePage from './Pages/homePage';




const App = () => {
  const user = useSelector( state => state.account.user ) ;
  
  

  if(!user){
    return <Login />
  }
  
  return (
    <>
      <Navbar />

        <Switch>
          <Route exact path='/' >
            <HomePage  /> 
          </Route>
          
          
        </Switch>

    </>
  );
}

export default App;
