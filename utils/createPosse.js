import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const post = async (body) => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log('Creating posse!!');

    return axios.post(
      ApiConfig.createPosse,
      body,
      config,
    ).catch(console.error);
  }).catch(console.error);
};

export default post;