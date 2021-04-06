import firebase from '../utils/Firebase';

const getBeat = async (path) => {
  const storage = firebase.storage();
  const gsReference = storage.refFromURL(path);
  return gsReference.getDownloadURL()
    .catch(console.error);
};

export default getBeat;