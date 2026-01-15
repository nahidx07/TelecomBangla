import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');

// ১. চেক করা ইউজার টেলিগ্রামে আছে কি না
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    // টেলিগ্রাম অটো লগইন
    const tgUser = tg.initDataUnsafe.user;
    handleUserAuth(tgUser.id.toString(), tgUser.first_name, tgUser.photo_url || "https://via.placeholder.com/150");
} else {
    // ওয়েবসাইট/অ্যাপ মোড: ফায়ারবেস Auth চেক করা
    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleUserAuth(user.uid, user.displayName, user.photoURL);
        } else {
            loginScreen.style.display = "flex"; // লগইন পেজ দেখাবে
        }
    });
}

// ২. ইউজার ডাটাবেস হ্যান্ডলার (অটো রেজিস্ট্রেশন ও ডেটা লোড)
async function handleUserAuth(uid, name, photo) {
    loginScreen.style.display = "none";
    mainApp.style.display = "block";

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        // নতুন ইউজার হলে ডাটাবেসে সেভ করা (অটো রেজিস্ট্রেশন)
        const userData = {
            id: uid,
            name: name,
            photo: photo,
            balance: 0,
            role: "user",
            createdAt: new Date()
        };
        await setDoc(userRef, userData);
        updateUI(userData);
    } else {
        // পুরাতন ইউজার হলে ডাটা আপডেট করা
        updateUI(snap.data());
    }
}

// ৩. ইউআই আপডেট
function updateUI(data) {
    document.getElementById('user-name').innerText = data.name;
    document.getElementById('user-id').innerText = data.id.substring(0, 6); // ছোট আইডি দেখানো
    document.getElementById('user-pic').src = data.photo;
    document.getElementById('balance').innerText = data.balance.toFixed(2);
}

// ৪. গুগল লগইন বাটন (শুধু ওয়েবসাইটের জন্য)
document.getElementById('google-login').onclick = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        alert("লগইন ব্যর্থ হয়েছে: " + error.message);
    }
};
