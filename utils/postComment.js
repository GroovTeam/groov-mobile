import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Post a new comment.
const postComment = async (postID, comment) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const body = {
      content: comment
    };

    const url = ApiConfig.postComment + '/' + postID;
    const encoded = encodeURI(url);

    return axios.post(
      encoded,
      body,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default postComment;