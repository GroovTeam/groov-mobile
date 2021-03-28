import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

const joinPosse = async (posseID) => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const posseURL = ApiConfig.joinPosse + '/' + posseID;

    console.log('Joining posse!! ' + posseURL);

    axios.post(
      posseURL,
      {}, // must have empty body
      config,
    ).then(console.log).catch(console.error);
  }).catch(console.error);
};

export default joinPosse;