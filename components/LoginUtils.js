import AsyncStorage from '@react-native-community/async-storage';

/**
 * 
 * @returns {Object} The user's session, undefined if non-existant
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

const createSession = async (session) => {
  try {
    const jsonSession = JSON.stringify(session);
    await AsyncStorage.setItem('@session', jsonSession);
  }
  catch (e) {
    console.error(e);
  }
};

const deleteSession = async () => {
  try {
    await AsyncStorage.removeItem('@session');
  }
  catch (e) {
    console.error(e);
  }
};

export { recoverSession, createSession, deleteSession };
