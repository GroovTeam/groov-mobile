import firebase from '../utils/Firebase';

const getBeat = async (path) => {
  const storage = firebase.storage();
  const gsReference = storage.refFromURL(path);
  console.log(gsReference);
  return gsReference.getDownloadURL();
};

export default getBeat;