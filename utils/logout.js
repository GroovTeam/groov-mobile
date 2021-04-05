import firebase from './Firebase';

// Log a user out.
const logout = async () => {
  return firebase.auth().signOut();
};

export default logout;