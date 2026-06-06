import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARC-wF-2dpI-Xkuzl_-QkipjZvE6OSXlM",
  authDomain: "aishwaryam-71892.firebaseapp.com",
  projectId: "aishwaryam-71892",
  storageBucket: "aishwaryam-71892.firebasestorage.app",
  messagingSenderId: "596096286505",
  appId: "1:596096286505:web:098ccac9d816fc51398138",
  measurementId: "G-GZTRF7BW76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
