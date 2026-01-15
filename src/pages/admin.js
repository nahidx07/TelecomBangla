import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function Admin() {
  const [offer, setOffer] = useState({ title: '', price: '', operator: '', category: '' });

  const addOffer = async () => {
    await addDoc(collection(db, "offers"), offer);
    alert("অফার যোগ হয়েছে!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">অ্যাডমিন কন্ট্রোল</h1>
      <input placeholder="অফারের নাম" onChange={e => setOffer({...offer, title: e.target.value})} className="border p-2 w-full mb-2" />
      <input placeholder="দাম" onChange={e => setOffer({...offer, price: e.target.value})} className="border p-2 w-full mb-2" />
      <select onChange={e => setOffer({...offer, operator: e.target.value})} className="border p-2 w-full mb-2">
         <option>Select Operator</option>
         <option value="GP">GP</option>
         <option value="Robi">Robi</option>
      </select>
      <button onClick={addOffer} className="bg-green-500 text-white p-3 w-full rounded">অফার সেভ করুন</button>
    </div>
  );
}
