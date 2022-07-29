import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import { useDispatch } from 'react-redux';

import{  Routes, Route} from "react-router-dom";
import { auth } from './firebase';
import { login ,logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import {useSelector} from 'react-redux' ;


function App() {
  const user = useSelector(selectUser);
   const dispatch = useDispatch();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged( (userAuth) => {
      if (userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else{
        dispatch(logout())

      }
    });

    return unsubscribe;

  },[dispatch]) ;



  return (
    <div className="app">

      {!user ? (
        <LoginScreen/>
      ):(
        <Routes>
          <Route path = "/profile" element={<ProfileScreen/>} />
          
        
          <Route exact path = "/" element={<HomeScreen/>}/>
        

        </Routes>
      )}
       </div>

      
    
  

   
  );
 }

export default App;
