import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const post = async () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const body = {
      name: 'the peeps',
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log('Creating posse!!');

    axios.post(
      ApiConfig.createPosse,
      body,
      config,
    ).then(console.log).catch(console.error);
  }).catch(console.error);
};

export default post;