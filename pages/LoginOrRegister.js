import React, { useState } from 'react';
import { Alert } from 'react-native';
import Login from './Login';
import Register from './Registration';

const LoginOrRegister = ({ updateSession }) => {
  // Register session and userData are stateful.
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (email, password) => {

    if (email == '' || password == '') {
      Alert.alert(
        'Empty Fields',
        'Please provide a login and password');
      return;
    }

    // TODO
    // Make API call.
    // Store the session in Async storage.

    /*
    const user = `{"email": ${email}, "password": ${password}}`
    const result = api call with user
    if (result !== null)
      createSession(result)
    */

    updateSession(null);
  };

  const registerAndLogin = () => {
    console.log(userData);
    // TODO
    // Make API call for registration

    login(userData.email, userData.password);

    // Stop registration process.
    setRegister(false);
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