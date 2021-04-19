import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Reply to a posts comment.
const replyComment = async (commentID, comment) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const body = {
      content: comment
    };

    const url = ApiConfig.replyComment + '/' + commentID;
    const encoded = encodeURI(url);

    return axios.post(
      encoded,
      body,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default replyComment;