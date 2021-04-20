import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Get the current user's profile.
const getProfileByUsername = async (username) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.profile + '/' + username;
    const encoded = encodeURI(url);

    return axios.get(
      encoded,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default getProfileByUsername;