import React, { useState } from 'react';
import Login from './Login';
import Register from './Registration';
import { createSession, deleteSession, register } from '../../utils/LoginUtils';

const LoginOrRegister = ({ attemptLogin }) => {
  // Register session and userData are stateful.
  const [registering, setRegistering] = useState(false);
  const [userData, setUserData] = useState({});
  
  const saveSessionAndLogin = (email, password) => {
    const session = {
      email: email,
      password: password,
    };
    deleteSession();
    createSession(session);
    attemptLogin();
  };

  const registerAndLogin = () => {
    // Stop registration process.
    setRegistering(false);

    register(userData)
      .then(response => {
        console.log(response);
        saveSessionAndLogin(userData.email, userData.password);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (registering)
    return <Register
      userData={userData}
      updateUserData={setUserData}
      applyRegistration={registerAndLogin}
      cancelRegistration={() => setRegistering(false)}
    />;
  else
    return (
      <Login
        login={saveSessionAndLogin}
        startRegister={() => setRegistering(true)}
      />
    );
};

export default LoginOrRegister;