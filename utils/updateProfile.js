import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Get the current user's profile.
const updateProfile = async (body) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return axios.post(
      ApiConfig.profile,
      body,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default updateProfile;