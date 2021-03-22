import React, { useState } from 'react';
import Login from './Login';
import Register from './Registration';

/**
 * Refactor
 * 
 * 
 * Use state to maintain if the user is registering or not
 * 
 * 
 */

const LoginOrRegister = ({ updateSession }) => {
  const [register, setRegister] = useState(false);

  const login = (email, password) => {
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


  if (register) return <Register />;
  else return (
    <Login
      login={login}
      startRegister={() => setRegister(true)}
    />
  );
};

export default LoginOrRegister;