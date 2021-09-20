//version 9 modular
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBhQeOZUwmPfxmpP12XJLFn7HP9JmSMKXM",
    authDomain: "crwn-db-5bc6e.firebaseapp.com",
    databaseURL: "https://crwn-db-5bc6e.firebaseio.com",
    projectId: "crwn-db-5bc6e",
    storageBucket: "crwn-db-5bc6e.appspot.com",
    messagingSenderId: "139514886905",
    appId: "1:139514886905:web:9726ba290610869bf20028",
    measurementId: "G-LBJEEW4Q4L"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;