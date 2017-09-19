import {resolve} from 'path';
import firebase from 'firebase';

/* import firebase keys */
import config from '../../../.sackdotorg.secrets';

firebase.__firebaseInit || (firebase.__firebaseInit = firebase.initializeApp(config));

export default firebase;
