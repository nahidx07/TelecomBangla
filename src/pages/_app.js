import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // টেলিগ্রাম মিনি অ্যাপ চেক
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // অ্যাপটি বড় করা

      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        handleTelegramLogin(tgUser);
      }
    }
  }, []);

  const handleTelegramLogin = async (tgUser) => {
    const userRef = doc(db, "users", `tg_${tgUser.id}`);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const newUser = {
        uid: `tg_${tgUser.id}`,
        name: `${tgUser.first_name} ${tgUser.last_name || ""}`,
        photo: tgUser.photo_url || "",
        balance: 0,
        role: "user"
      };
      await setDoc(userRef, newUser);
      setUser(newUser);
    } else {
      setUser(snap.data());
    }
  };

  return <Component {...pageProps} user={user} />;
}
export default MyApp;
