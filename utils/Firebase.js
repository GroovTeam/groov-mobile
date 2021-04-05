import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import FirebaseConfig from './FirebaseConfig';

firebase.initializeApp(FirebaseConfig);

export default firebase;