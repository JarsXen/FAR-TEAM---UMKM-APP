import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoQmlIhFGRfuwTFZLD8bRcbSy6jyswZT0",
  authDomain: "forum-diskus.firebaseapp.com",
  projectId: "forum-diskus",
  storageBucket: "forum-diskus.appspot.com",
  messagingSenderId: "434039824623",
  appId: "1:434039824623:web:0d7d05149eb8ed20d4bb1a"
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let isFirebaseConfigValid = false;
let firebaseError: string | null = null;

if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey !== "MASUKKAN_API_KEY_ANDA") {
  isFirebaseConfigValid = true; 
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Koneksi Firebase berhasil. Aplikasi berjalan dalam mode online.");
  } catch (error: any) {
    firebaseError = error.message || "Terjadi kesalahan yang tidak diketahui saat inisialisasi Firebase.";
    
    if (firebaseError.includes('Service firestore is not available')) {
        console.warn(`Koneksi Firestore ditunda. Aktifkan Firestore di Firebase Console Anda. Pesan: ${firebaseError}`);
    } else {
        console.error(`Inisialisasi Firebase gagal, periksa konfigurasi Anda:\n${firebaseError}`);
    }
    
    db = null; 
  }
} else {
    console.warn("Konfigurasi Firebase tidak diatur. Aplikasi berjalan dalam mode lokal.");
}

export { db, isFirebaseConfigValid, firebaseError };