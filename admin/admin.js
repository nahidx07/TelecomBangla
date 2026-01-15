
import { db } from '../firebase-config.js'; // এক ফোল্ডার বাইরে থেকে ইম্পোর্ট
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('save-btn').onclick = async () => {
    const op = document.getElementById('op-select').value;
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('offer-title').value;
    const price = document.getElementById('offer-price').value;
    const validity = document.getElementById('offer-validity').value;

    try {
        await addDoc(collection(db, "offers"), {
            operator: op,
            category: cat,
            title: title,
            price: Number(price),
            validity: validity
        });
        alert("অফার সফলভাবে যোগ হয়েছে!");
    } catch (e) {
        alert("ভুল হয়েছে: " + e);
    }
};
