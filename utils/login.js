import firebase from './Firebase';

// Login a user with an email and password
const login = async (email, password) => {

  const userData = {
    email: email,
    password: password,
  };

  const { errors, valid } = validateData(userData);

  if (!valid)
    throw Error(JSON.stringify(errors));

  firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
    .then((data) => {
      return data.user.getIdToken(true);
    })
    .then((token) => {
      return token;
    })
    .catch((err) => {
      console.error(err);
      // auth/invalid-email
      // auth/user-disabled
      // auth/user-not-found
      // auth/wrong-password
      throw Error(JSON.stringify(err));
    });
};

const isEmpty = (str) => {
  return (str === undefined || str === '');
};

// Data validation
const validateData = (data) => {
  let errors = {};

  if (isEmpty(data.email))
    errors.email = 'Cannot be empty';
  if (isEmpty(data.password))
    errors.password = 'Cannot be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

export default login;