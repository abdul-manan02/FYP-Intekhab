import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import PhoneVerify from '../components/PhoneVerify';

const OTP = () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyDnbJLD-2fYahatSlzS95Dkgk_JflqLE64',
        authDomain: 'entekhaab-e095d.firebaseapp.com',
        projectId: 'entekhaab-e095d',
        storageBucket: 'entekhaab-e095d.appspot.com',
        messagingSenderId: '441216778977',
        appId: '1:441216778977:web:413a2211ccdc2fce7fada0',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unSubscriber = onAuthStateChanged(firebase.auth(), (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });

        return () => unSubscriber();
    }, []);

    return (
        <div>
            <h1>Verify phone number with OTP</h1>
            <PhoneVerify auth={firebase.auth()}></PhoneVerify>
        </div>
    );
};

export default OTP;
