
import { db } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tg = window.Telegram.WebApp;
tg.expand();

let currentOp = "";

async function initUser() {
    const user = tg.initDataUnsafe?.user;
    if (user) {
        document.getElementById('user-name').innerText = user.first_name;
        document.getElementById('user-id').innerText = user.id;
        document.getElementById('user-pic').src = user.photo_url || "https://via.placeholder.com/150";

        const userRef = doc(db, "users", user.id.toString());
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            await setDoc(userRef, { name: user.first_name, balance: 0, id: user.id });
        } else {
            document.getElementById('balance').innerText = snap.data().balance;
        }
    }
}

window.selectOp = (op) => {
    currentOp = op;
    document.getElementById('op-title').innerText = op + " এর ক্যাটাগরি";
    document.getElementById('offer-section').classList.remove('hidden');
};

window.loadOffers = async (cat) => {
    const list = document.getElementById('offer-list');
    list.innerHTML = "লোড হচ্ছে...";
    
    const q = query(collection(db, "offers"), where("operator", "==", currentOp), where("category", "==", cat));
    const snap = await getDocs(q);
    
    list.innerHTML = "";
    snap.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `
            <div class="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-gray-800">${data.title}</h4>
                    <p class="text-[10px] text-gray-400">মেয়াদ: ${data.validity}</p>
                    <p class="text-blue-600 font-bold">৳ ${data.price}</p>
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">কিনুন</button>
            </div>
        `;
    });
};

initUser();
