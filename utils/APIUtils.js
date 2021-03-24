import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ApiConfig from './ApiConfig';

/**
 * Recovers a current login session from storage.
 * 
 * @returns {Object} The user's session, undefined if non-existant.
 */
const recoverSession = async () => {
  try {
    const session = await AsyncStorage.getItem('@session');
    return session != null ? JSON.parse(session) : null;
  }
  catch (e) {
    console.error(e);
    return undefined;
  }
};

/**
 * Creates and stores a new session in storage.
 * 
 * @param {Object} session The session to be created.
 */
const createSession = async (session) => {
  try {
    const jsonSession = JSON.stringify(session);
    await AsyncStorage.setItem('@session', jsonSession);
  }
  catch (e) {
    console.error(e);
  }
};

/**
 * Deletes a session.
 */
const deleteSession = async () => {
  try {
    await AsyncStorage.removeItem('@session');
  }
  catch (e) {
    console.error(e);
  }
};

/**
 * 
 * @param {String} base the base url
 * @param {Object} params the params to be encoded
 */
const constructURL = (base, params) => {
  // Add all of the params
  let url = base;

  if (Object.entries(params).length > 0)
    url += '?';

  for (const [key, value] of Object.entries(params))
    url += key + '=' + value + '&';

  // Remove the last &
  return encodeURI(url.slice(0, -1));
};

const login = async (email, password) => {
  // Field verification
  if (email == '' || password == '')
    throw Error('Login and Password must be populated');

  // Construct JSON for request.
  const loginObject = {
    email: email,
    password: password,
  };

  // Attempt to login
  try {
    const response = await axios.post(ApiConfig.login, loginObject);
    return response;
  }
  catch (error) {
    if (error.response)
      throw Error(JSON.stringify(error.response.data));
    throw Error('Unknown Login Error');
  }
};

/**
 * Registers a new user.
 * 
 * @param {Object} userObject an object representing a new user 
 */
const register = async (userObject) => {
  try {
    const response = await axios.post(ApiConfig.register, userObject);
    return response;
  }
  catch (error) {
    if (error.response)
      throw Error(JSON.stringify(error.response.data));
    throw Error('Unknown registration error');
  }
};

export { 
  recoverSession,
  createSession,
  deleteSession,
  login,
  register,
};
