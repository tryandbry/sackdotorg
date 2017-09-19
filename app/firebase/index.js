import {resolve} from 'path';
import firebase from 'firebase';

/* import firebase keys */
import config from '../../../.sackdotorg.secrets';
import {login} from '../../../.sackdotorg.secrets';

firebase.__firebaseInit || (firebase.__firebaseInit = firebase.initializeApp(config));

/* login */
firebase.auth().signInWithEmailAndPassword(login.email,login.password)
.catch(function(error){
  var errorCode = error.code;
  var errorMessage = error.message;
});

export default firebase;
