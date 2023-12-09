import exp from "constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";





// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXEMRjOyqaPzNQ5VjfC8W2P_QdDnntbHY",
  authDomain: "dropbox-clone-5dc7a.firebaseapp.com",
  projectId: "dropbox-clone-5dc7a",
  storageBucket: "dropbox-clone-5dc7a.appspot.com",
  messagingSenderId: "660908910408",
  appId: "1:660908910408:web:6069b661025d888623f57d"
};

// // Initialize Firebase
const app = getApps().length? getApp() : initializeApp(firebaseConfig);
const db=getFirestore(app)
const storage=getStorage(app)

export { db, storage }


