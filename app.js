import { db, auth, provider, signInWithPopup } from './firebase-config.js';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const tg = window.Telegram.WebApp;
tg.expand();

// ১. ইউজার মোড ডিটেক্ট করা (টেলিগ্রাম নাকি ওয়েব)
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    handleUserAuth(user.id.toString(), user.first_name, user.photo_url || "https://via.placeholder.com/150");
} else {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleUserAuth(user.uid, user.displayName, user.photoURL);
        } else {
            // যদি ব্রাউজারে থাকে এবং লগইন না থাকে তবে লগইন পেজে পাঠান
            // window.location.href = "login.html"; 
        }
    });
}

// ২. ডাটাবেস থেকে ইউজার ইনফো হ্যান্ডেল করা
async function handleUserAuth(uid, name, photo) {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        const userData = { id: uid, name: name, photo: photo, balance: 0, role: "user" };
        await setDoc(userRef, userData);
        updateUI(userData);
    } else {
        updateUI(snap.data());
    }
}

// ৩. হোম স্ক্রিনে ইউজারের তথ্য দেখানো
function updateUI(data) {
    document.getElementById('user-name').innerText = data.name;
    document.getElementById('phone-number').innerText = data.id.substring(0, 11); // ডেমো নাম্বার হিসেবে আইডি
    document.getElementById('user-pic').src = data.photo;
    // ব্যালেন্স বাটন বা অন্য কোথাও দেখাতে চাইলে তা এখানে আপডেট করুন
}

// ৪. ক্যাটাগরি অনুযায়ী অফার লোড করা (নতুন ডিজাইনের কার্ড)
window.loadOffers = async (category) => {
    const offerList = document.getElementById('offer-list');
    offerList.innerHTML = `<p class="col-span-2 text-center text-gray-400 py-10">অফার লোড হচ্ছে...</p>`;

    try {
        const q = query(collection(db, "offers"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        
        offerList.innerHTML = ""; // আগের লিস্ট ক্লিয়ার করা

        if (querySnapshot.empty) {
            offerList.innerHTML = `<p class="col-span-2 text-center text-gray-400 py-10 font-bold">এই ক্যাটাগরিতে কোনো অফার নেই</p>`;
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // এখানে হুবহু আপনার দেওয়া ছবির মতো কার্ড তৈরি হবে
            offerList.innerHTML += `
                <div class="offer-card p-5 flex flex-col items-center shadow-sm">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fa-solid fa-globe text-blue-500 text-sm"></i>
                        <span class="font-bold text-[13px] text-gray-800">${data.title}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400 text-[10px] mb-4 italic">
                        <i class="fa-regular fa-clock text-red-400"></i> ${data.validity}
                    </div>
                    <button onclick="confirmPurchase('${doc.id}', ${data.price})" class="price-btn text-[11px] w-full">
                        ৳ ${data.price}
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading offers: ", error);
        offerList.innerHTML = `<p class="col-span-2 text-center text-red-400">সার্ভার সমস্যা!</p>`;
    }
};

// ৫. অফার কেনার ফাংশন (প্রাথমিক প্রম্পট)
window.confirmPurchase = (id, price) => {
    const userConfirmed = confirm(`আপনি কি ৳ ${price} টাকা দিয়ে এই অফারটি কিনতে চান?`);
    if (userConfirmed) {
        alert("আপনার অর্ডারটি পেন্ডিং আছে। এডমিন শীঘ্রই এপ্রুভ করবেন।");
        // এখানে ফায়ারবেসে 'orders' কালেকশনে ডাটা পাঠানোর কোড হবে
    }
};

// পেজ লোড হলে ডিফল্টভাবে 'Data' অফার দেখাবে
window.onload = () => {
    setTimeout(() => loadOffers('Internet'), 1000);
};
