import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
const loginScreen = document.getElementById('login-screen');

// ১. অটো লগইন লজিক
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

// ২. ইউজার ডাটাবেস চেক ও আপডেট
async function handleUserAuth(uid, name, photo) {
    loginScreen.style.display = "none";
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        const userData = { id: uid, name: name, photo: photo, balance: 0 };
        await setDoc(userRef, userData);
        updateUI(userData);
    } else {
        updateUI(snap.data());
    }
}

function updateUI(data) {
    document.getElementById('user-name').innerText = data.name;
    document.getElementById('phone-number').innerText = data.id.toString().substring(0, 11);
    document.getElementById('user-pic').src = data.photo;
}

// ৩. অফার লোড করা (ছবির মতো ডিজাইন জেনারেট হবে)
window.loadOffers = async (category) => {
    const list = document.getElementById('offer-list');
    list.innerHTML = `<p class="col-span-2 text-center text-gray-400 py-10">লোড হচ্ছে...</p>`;

    try {
        const q = query(collection(db, "offers"), where("category", "==", category));
        const snap = await getDocs(q);
        list.innerHTML = "";

        if (snap.empty) {
            list.innerHTML = `<p class="col-span-2 text-center text-gray-400 py-10">এই ক্যাটাগরিতে অফার নেই</p>`;
            return;
        }

        snap.forEach(doc => {
            const data = doc.data();
            list.innerHTML += `
                <div class="offer-card p-5 flex flex-col items-center">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fa-solid fa-globe text-blue-500"></i>
                        <span class="font-bold text-sm text-gray-800 text-center">${data.title}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400 text-[10px] mb-4 italic">
                        <i class="fa-regular fa-clock text-red-400"></i> ${data.validity}
                    </div>
                    <button onclick="confirmBuy('${doc.id}', ${data.price})" class="price-btn w-full py-2 text-xs">
                        ৳ ${data.price}
                    </button>
                </div>
            `;
        });
    } catch (e) {
        list.innerHTML = "সার্ভার এরর!";
    }
};

// ৪. কেনা নিশ্চিত করা
window.confirmBuy = (id, price) => {
    if(confirm(`আপনি কি ৳ ${price} দিয়ে অফারটি কিনতে চান?`)) {
        alert("অর্ডার সফল! এডমিন এপ্রুভ করলে আপনি অফারটি পেয়ে যাবেন।");
    }
}

// ৫. গুগল লগইন বাটন
document.getElementById('google-login').onclick = () => signInWithPopup(auth, provider);

// ডিফল্টভাবে অফার লোড
window.onload = () => setTimeout(() => loadOffers('Internet'), 1000);
