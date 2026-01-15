import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
const loginScreen = document.getElementById('login-screen');

let currentCategory = "";
let currentOperator = "";

// ১. অথেনটিকেশন এবং অটো-রেজিস্ট্রেশন
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    handleUserAuth(user.id.toString(), user.first_name, user.photo_url);
} else {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleUserAuth(user.uid, user.displayName, user.photoURL);
        } else {
            loginScreen.classList.remove('hidden-view');
        }
    });
}

async function handleUserAuth(uid, name, photo) {
    loginScreen.classList.add('hidden-view');
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        const userData = { id: uid, name: name, photo: photo || "https://via.placeholder.com/150", balance: 0 };
        await setDoc(userRef, userData);
        updateUI(userData);
    } else {
        updateUI(snap.data());
    }
}

function updateUI(data) {
    document.getElementById('balance').innerText = data.balance.toFixed(2);
    document.getElementById('user-pic').src = data.photo;
}

// ২. ভিউ কন্ট্রোল লজিক
window.openOperators = (cat) => {
    currentCategory = cat;
    document.getElementById('view-home').classList.add('hidden-view');
    document.getElementById('view-offers').classList.add('hidden-view');
    document.getElementById('view-operators').classList.remove('hidden-view');
};

window.selectOperator = async (op) => {
    currentOperator = op;
    document.getElementById('view-operators').classList.add('hidden-view');
    document.getElementById('view-offers').classList.remove('hidden-view');
    loadOffers();
};

window.goHome = () => {
    document.getElementById('view-home').classList.remove('hidden-view');
    document.getElementById('view-operators').classList.add('hidden-view');
    document.getElementById('view-offers').classList.add('hidden-view');
};

// ৩. অফার লোড করা (Firestore থেকে)
async function loadOffers() {
    const container = document.getElementById('offer-container');
    container.innerHTML = `<p class="text-center py-10 text-gray-400">অফার খোঁজা হচ্ছে...</p>`;

    try {
        const q = query(
            collection(db, "offers"), 
            where("operator", "==", currentOperator), 
            where("category", "==", currentCategory)
        );
        const snap = await getDocs(q);
        container.innerHTML = "";

        if (snap.empty) {
            container.innerHTML = `<p class="text-center py-10">দুঃখিত, বর্তমানে কোনো অফার নেই।</p>`;
            return;
        }

        snap.forEach(docSnap => {
            const data = docSnap.data();
            container.innerHTML += `
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800 text-sm">${data.title}</p>
                        <p class="text-[10px] text-gray-500">${data.validity} মেয়াদ</p>
                        <p class="text-red-600 font-bold mt-1">৳ ${data.price}</p>
                    </div>
                    <button onclick="buyOffer('${docSnap.id}', ${data.price})" class="bg-red-600 text-white px-5 py-2 rounded-full text-xs font-bold">কিনুন</button>
                </div>
            `;
        });
    } catch (e) {
        container.innerHTML = `<p class="text-center py-10 text-red-500">ডাটা লোড করতে সমস্যা হয়েছে!</p>`;
    }
}

window.buyOffer = (id, price) => {
    if(confirm(`আপনি কি ৳${price} দিয়ে এই অফারটি কিনতে চান?`)) {
        alert("আপনার অর্ডার সফল হয়েছে। এডমিন এপ্রুভ করলে অফার পাবেন।");
    }
};

// গুগল লগইন
document.getElementById('google-login').onclick = () => signInWithPopup(auth, provider);
