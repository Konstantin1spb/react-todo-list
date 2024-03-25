import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAvMWXMRL3NOfmCE-NOhU-GtTyJVgmMikQ',
	authDomain: 'react-todos-8322e.firebaseapp.com',
	databaseURL:
		'https://react-todos-8322e-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'react-todos-8322e',
	storageBucket: 'react-todos-8322e.appspot.com',
	messagingSenderId: '453788470702',
	appId: '1:453788470702:web:21c59902d4036b7f68cc3f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
