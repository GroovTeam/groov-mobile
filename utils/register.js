import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

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
      ).then(userCred => {
        userCred.user.sendEmailVerification();
      }).catch(console.error);
  }).catch(console.error);
};

export default register;