import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Get all registered beats from our servers.
const getBeats = async () => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return axios.get(
      ApiConfig.getBeats,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default getBeats;