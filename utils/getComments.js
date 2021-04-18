import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Get a posts comments.
const getComments = async (postID) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.getComments + '/' + postID;
    const encoded = encodeURI(url);

    return axios.get(
      encoded,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default getComments;