import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD0UKJH-WLE9YXd-8dIxy6aNNx0vjrtVig",
  authDomain: "crypto-109f4.firebaseapp.com",
  projectId: "crypto-109f4",
  storageBucket: "crypto-109f4.appspot.com",
  messagingSenderId: "633560806968",
  appId: "1:633560806968:web:7dc356e4196c4f602318cd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();