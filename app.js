import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
const loginScreen = document.getElementById('login-screen');

// ১. অথেনটিকেশন চেক
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    handleUserAuth(user.id.toString(), user.first_name, user.photo_url || "https://via.placeholder.com/150");
} else {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleUserAuth(user.uid, user.displayName, user.photoURL);
        } else {
            loginScreen.style.display = "flex";
        }
    });
}

async function handleUserAuth(uid, name, photo) {
    loginScreen.style.display = "none";
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        const userData = { id: uid, name: name, photo: photo, balance: 0, role: "user" };
        await setDoc(userRef, userData);
        updateUI(userData);
    } else {
        updateUI(snap.data());
    }
    loadTransactions(uid);
}

function updateUI(data) {
    document.getElementById('balance').innerText = data.balance.toFixed(2);
    document.getElementById('user-pic').src = data.photo;
}

// ২. অফার দেখানোর ফাংশন (ক্লিক করলে অপারেটর লিস্ট আসার কথা)
window.showOffers = (category) => {
    // এখানে আপনি আলাদা একটি মোডাল বা পেজ ওপেন করে GP, Robi আইকন দেখাতে পারেন
    alert(category + " অফারগুলো লোড হচ্ছে...");
    // লজিক: window.location.href = 'operators.html?cat=' + category;
};

// ৩. সাম্প্রতিক লেনদেন লোড করা
async function loadTransactions(uid) {
    const list = document.getElementById('transaction-list');
    // ফায়ারবেস থেকে লেনদেন আনা (যদি থাকে)
    // const q = query(collection(db, "transactions"), where("uid", "==", uid), orderBy("date", "desc"), limit(5));
    // ...
}

// ৪. ন্যাভিগেশন লজিক
window.navigate = (page) => {
    console.log("Navigating to: " + page);
    // পেজ পরিবর্তন বা মোডাল ওপেন করার লজিক
};

// গুগল লগইন
document.getElementById('google-login').onclick = () => signInWithPopup(auth, provider);
