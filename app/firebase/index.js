import {resolve} from 'path';
//import config from `${process.env.proot}../.sackdotorg.secrets`;
import config from '../../../.sackdotorg.secrets';
import firebase from 'firebase';

firebase.__firebaseInit || (firebase.__firebaseInit = firebase.initializeApp(config));

export default firebase;
