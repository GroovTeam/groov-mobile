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

export default recoverSession;