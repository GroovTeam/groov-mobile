import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Register a new user.
const register = async (email, password, username, firstName, lastName) => {

  let userData = {
    email: email,
    password: password,
    username: username,
    firstName: firstName,
    lastName: lastName,
    dateCreated: Date.now()
  };

  axios.post(
    ApiConfig.register,
    userData
  ).then(result => {
    if (result.data.token)
      firebase.auth().signInWithEmailAndPassword(
        email,
        password
      ).catch(console.error);
  }).catch(err => {
    console.error(err.message);
  });
};

export default register;