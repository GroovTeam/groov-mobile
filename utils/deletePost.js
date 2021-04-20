import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Create a new post.
const post = async (postID) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.deletePost + '/' + postID;
    const encoded = encodeURI(url);

    return axios.delete(
      encoded,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default post;