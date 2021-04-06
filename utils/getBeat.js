import firebase from '../utils/Firebase';

// Gets a single beat's downloadable URL from the server.
const getBeat = async (path) => {
  const storage = firebase.storage();
  const gsReference = storage.refFromURL(path);
  return gsReference.getDownloadURL()
    .catch(console.error);
};

export default getBeat;