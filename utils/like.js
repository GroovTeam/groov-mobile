import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Create a new post.
const like = async (postID) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.like + '/' + postID;

    return axios.post(
      url,
      {},
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default like;