import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Create a new post.
const likeComment = async (commentID) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.likeComment + '/' + commentID;

    return axios.post(
      url,
      {},
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default likeComment;