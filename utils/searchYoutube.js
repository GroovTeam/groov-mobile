import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const searchYoutube = async (query) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = ApiConfig.searchYoutube + '/' + query;
    const encodedURL = encodeURI(url);

    console.log(encodedURL);

    return axios.post(
      encodedURL,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default searchYoutube;