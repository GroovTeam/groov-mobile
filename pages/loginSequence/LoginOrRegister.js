import React, { useState } from 'react';
import Login from './Login';
import Register from './Registration';
import login from '../../utils/login';
import register from '../../utils/register';

const LoginOrRegister = () => {

  // Register session and userData are stateful.
  const [registering, setRegistering] = useState(false);
  const [userData, setUserData] = useState({});

  // Register a new user.
  const registerUser = () => {
    register(userData.email,
      userData.password,
      userData.username,
      userData.firstName,
      userData.lastName)
      .catch(err => {
        console.error(err);
      });
  };

  // Attempt to login an existing user.
  const loginUser = (email, password) => {
    login(email, password)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (registering)
    return <Register
      userData={userData}
      updateUserData={setUserData}
      applyRegistration={registerUser}
      cancelRegistration={() => setRegistering(false)}
    />;
  else
    return (
      <Login
        login={loginUser}
        startRegister={() => setRegistering(true)}
      />
    );
};

export default LoginOrRegister;