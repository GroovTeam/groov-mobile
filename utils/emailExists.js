import axios from 'axios';
import ApiConfig from './ApiConfig';

// Check if a user exists already
const emailExists = async (email) => {

  const url = ApiConfig.emailExists + '/' + email;
  const encoded = encodeURI(url);

  return axios.get(
    encoded
  ).then(result => {
    return result.data.result;
  }).catch(console.error);
};

export default emailExists;