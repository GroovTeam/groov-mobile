import firebase from './Firebase';

// Login a user with an email and password
const logout = async () => {
  firebase.auth().signOut();
};

export default logout;