import { useEffect, useState } from 'react';
import { db } from '../src/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState({ name: "User", balance: 0 });

  useEffect(() => {
    // টেলিগ্রাম অটো-লগইন চেক
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        // ফায়ারবেসে ইউজার সেভ করার লজিক এখানে হবে
        setUser({ name: tgUser.first_name, balance: 0 });
      }
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* ব্যালেন্স সেকশন */}
      <div style={{ background: 'linear-gradient(to right, #4f46e5, #ec4899)', padding: '20px', color: 'white', borderRadius: '0 0 20px 20px' }}>
        <p>ব্যালেন্স</p>
        <h1 style={{ fontSize: '30px' }}>৳ {user.balance}</h1>
        <button style={{ background: 'white', color: 'black', padding: '5px 15px', borderRadius: '20px', border: 'none' }}>Add Money</button>
      </div>

      {/* অপারেটর লিস্ট */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '15px' }}>
        {['GP', 'Robi', 'BL', 'Airtel'].map(op => (
          <div key={op} style={{ background: 'white', padding: '10px', textAlign: 'center', borderRadius: '10px' }}>{op}</div>
        ))}
      </div>

      {/* বটম নেভিগেশন */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', display: 'flex', justifyContent: 'space-around', padding: '10px', borderTop: '1px solid #ddd' }}>
        <span>Home</span>
        <span>Offers</span>
        <span style={{ fontWeight: 'bold', color: '#ec4899' }}>History</span>
        <span>Profile</span>
      </div>
    </div>
  );
}
