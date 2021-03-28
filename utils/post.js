import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const post = async () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const body = {
      content: 'metal post',
      posses : ['the peeps'],
      tags : ['metal'],
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log('Posting!!');

    axios.post(
      ApiConfig.post,
      body,
      config,
    ).then(console.log).catch(console.error);
  }).catch(console.error);
};

export default post;