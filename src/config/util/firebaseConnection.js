import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDINCiEbKTjWwOYnb2DzM98CQW2HRi8f40",
    authDomain: "restaurante-e5a05.firebaseapp.com",
    projectId: "restaurante-e5a05",
    storageBucket: "restaurante-e5a05.appspot.com",
    messagingSenderId: "201808930240",
    appId: "1:201808930240:web:780531b87484de5a40d425"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage};