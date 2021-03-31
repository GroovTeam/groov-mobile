import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const getFeed = async () => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return axios.get(
      ApiConfig.feed,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default getFeed;