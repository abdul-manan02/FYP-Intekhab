// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyC4JxJbbkG2AZ9J1QcObl4pGIYZ_ZaBY8Y',
    authDomain: 'otp-fyp-df6bb.firebaseapp.com',
    projectId: 'otp-fyp-df6bb',
    storageBucket: 'otp-fyp-df6bb.appspot.com',
    messagingSenderId: '819347703861',
    appId: '1:819347703861:web:0a00338d67eec881de097c',
    measurementId: 'G-MJKVRBQGSH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
