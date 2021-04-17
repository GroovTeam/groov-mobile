import firebase from './Firebase';

// Gets a single beat's downloadable URL from the server.
const getFile = async (path) => {

  if (!path) return undefined;

  const storage = firebase.storage();
  const gsReference = storage.refFromURL(path);
  return gsReference.getDownloadURL()
    .catch(console.error);
};

export default getFile;