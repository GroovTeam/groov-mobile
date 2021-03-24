import React, { useState } from 'react';
import { Alert } from 'react-native';
import Login from './Login';
import Register from './Registration';
import axios from 'axios';
import ApiConfig from '../../utils/ApiConfig';
import { createSession, deleteSession } from '../../utils/LoginUtils';

const LoginOrRegister = ({ alertLogin }) => {
  // Register session and userData are stateful.
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState({});
  
  const login = (email, password) => {
    // Field verification
    if (email == '' || password == '') {
      Alert.alert(
        'Empty Fields',
        'Please provide a login and password'
      );
      return;
    }

    // Construct JSON for request.
    const loginObject = {
      email: email,
      password: password
    };

    // Send POST request
    axios.post(ApiConfig.login, loginObject)
      .then(response => {
        const token = response.data.token;
        deleteSession();
        createSession(token);
        alertLogin();
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          Alert.alert(
            'Login failed',
            'Invalid login credentials.',
          );
        }
      });
  };

  const registerAndLogin = () => {
    // Stop registration process.
    setRegister(false);
    
    // Send POST request
    axios.post(ApiConfig.register, userData)
      .then(response => {
        console.log(response);
        login(userData.email, userData.password);
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          Alert.alert(
            'Registration Failed',
            'An error caused your registration to fail, we are looking into it.',
          );
        }
      });
  };

  if (register)
    return <Register
      userData={userData}
      updateUserData={setUserData}
      applyRegistration={registerAndLogin}
      cancelRegistration={() => setRegister(false)}
    />;
  else
    return (
      <Login
        login={login}
        startRegister={() => setRegister(true)}
      />
    );
};

export default LoginOrRegister;