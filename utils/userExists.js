import axios from 'axios';
import ApiConfig from './ApiConfig';

// Check if a user exists already
const userExists = async (username) => {

  const url = ApiConfig.userExists + '/' + username;
  const encoded = encodeURI(url);

  return axios.get(
    encoded
  ).then(result => {
    return result.data.result;
  }).catch(console.error);
};

export default userExists;