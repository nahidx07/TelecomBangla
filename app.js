import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
const loginScreen = document.getElementById('login-screen');
let currentCategory = "";
let currentOperator = "";

// ১. অটো লগইন চেক (টেলিগ্রাম বনাম ওয়েব)
function initApp() {
    tg.ready();
    tg.expand();
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const u = tg.initDataUnsafe.user;
        handleAuth(u.id.toString(), u.first_name, u.photo_url || `https://ui-avatars.com/api/?name=${u.first_name}`);
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) handleAuth(user.uid, user.displayName, user.photoURL);
            else loginScreen.style.display = "flex";
        });
    }
}

async function handleAuth(uid, name, photo) {
    loginScreen.style.display = "none";
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        const data = { id: uid, name: name, photo: photo, balance: 0, role: "user" };
        await setDoc(ref, data);
        renderUI(data);
    } else renderUI(snap.data());
}

function renderUI(data) {
    document.getElementById('balance').innerText = data.balance.toFixed(2);
    document.getElementById('user-pic').src = data.photo;
}

// ২. ন্যাভিগেশন লজিক
window.openOperatorMenu = (cat) => {
    currentCategory = cat;
    showView('operator-view');
};

window.selectOperator = (op) => {
    currentOperator = op;
    showView('offer-view');
    loadOffers();
};

window.showHome = () => showView('home-view');
window.showOperators = () => showView('operator-view');

function showView(viewId) {
    ['home-view', 'operator-view', 'offer-view'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(viewId).classList.remove('hidden');
}

// ৩. অফার লোড করা
async function loadOffers() {
    const container = document.getElementById('offer-container');
    container.innerHTML = `<p class="text-center py-10 text-gray-400">অফার লোড হচ্ছে...</p>`;
    const q = query(collection(db, "offers"), where("operator", "==", currentOperator), where("category", "==", currentCategory));
    const snap = await getDocs(q);
    container.innerHTML = snap.empty ? `<p class="text-center py-10">কোনো অফার পাওয়া যায়নি</p>` : "";
    snap.forEach(d => {
        const off = d.data();
        container.innerHTML += `
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-gray-800">${off.title}</h4>
                    <p class="text-[10px] text-gray-400">${off.validity} মেয়াদ</p>
                    <p class="nagad-red font-bold">৳ ${off.price}</p>
                </div>
                <button onclick="buyNow('${d.id}', ${off.price})" class="nagad-bg text-white px-5 py-2 rounded-full text-xs font-bold shadow-md">কিনুন</button>
            </div>`;
    });
}

window.buyNow = (id, price) => {
    if(confirm(`৳${price} দিয়ে অফারটি কিনতে চান?`)) alert("অর্ডার সফল! এডমিন এপ্রুভ করলে পাবেন।");
};

document.getElementById('google-login').onclick = () => signInWithPopup(auth, provider);
initApp();
