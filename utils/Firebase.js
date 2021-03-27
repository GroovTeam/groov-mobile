import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import FirebaseConfig from './FirebaseConfig';

firebase.initializeApp(FirebaseConfig);
firebase.auth().useEmulator('http://10.0.2.2:9099');

export default firebase;