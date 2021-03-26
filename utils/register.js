import firebase from './Firebase';

const register = async (email, password, username, firstName, lastName) => {

  let userData = {
    email: email,
    password: password,
    username: username,
    firstName: firstName,
    lastName: lastName,
    dateCreated: Date.now()
  };

  const { errors, valid } = validateData(userData);
  if(!valid)
    throw Error(JSON.stringify(errors));

  let res;

  firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    .then(response => { console.log(response); res = response; })
    .catch(err => { throw Error(JSON.stringify(err)); });

  return res;
};

const isEmpty = (str) => {
  return (str === undefined || str === '');
};

// Data validation
const validateData = (data) => {
  let errors = {};

  if (isEmpty(data.email))
    errors.email = 'Cannot be empty';
  if(isEmpty(data.password))
    errors.password = 'Cannot be empty';
  if(isEmpty(data.username))
    errors.username = 'Cannot be empty';
  if(isEmpty(data.firstName))
    errors.firstName = 'Cannot be empty';
  if(isEmpty(data.lastName))
    errors.lastName = 'Cannot be empty';

  return { 
    errors, 
    valid: Object.keys(errors).length === 0 ? true : false 
  };
};

export default register;