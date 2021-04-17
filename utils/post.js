import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Create a new post.
const post = async (body) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return axios.post(
      ApiConfig.post,
      body,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default post;