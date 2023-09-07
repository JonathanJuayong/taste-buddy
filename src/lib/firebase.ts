import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAR1f6RJBXkrv9cywZS7oPfW1_9cQrgBJY',
	authDomain: 'svelte-auth-test-f0b46.firebaseapp.com',
	projectId: 'svelte-auth-test-f0b46',
	storageBucket: 'svelte-auth-test-f0b46.appspot.com',
	messagingSenderId: '90237011419',
	appId: '1:90237011419:web:847a0a15dbb1cdaee053fe'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

await setPersistence(auth, inMemoryPersistence);
