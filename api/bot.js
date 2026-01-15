const { Telegraf, Markup } = require('telegraf');
const admin = require('firebase-admin');

// Firebase Admin Initialize (আপনার সার্ভিস অ্যাকাউন্ট কী ব্যবহার করতে হবে)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
}
const db = admin.firestore();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const { id, first_name, last_name, username, photo_url } = ctx.from;
    const fullName = first_name + (last_name ? " " + last_name : "");

    // ১. ডাটাবেসে ইউজার সেভ করা (অটো একাউন্ট)
    const userRef = db.collection('users').doc(id.toString());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        await userRef.set({
            id: id,
            name: fullName,
            photo: photo_url || 'https://i.pravatar.cc/150',
            balance: 0,
            joinedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }

    // ২. এডমিন প্যানেল থেকে চ্যানেল লিংক আনা
    const settings = await db.collection('settings').doc('config').get();
    const channelLink = settings.exists ? settings.data().channelLink : 'https://t.me/yourchannel';

    const msg = `স্বাগতম ${fullName}!\nআপনার আইডি কোড: <code>${id}</code>\nনিচের বাটনে ক্লিক করে অফার দেখুন।`;

    return ctx.replyWithHTML(msg, Markup.inlineKeyboard([
        [Markup.button.webApp('📱 ওপেন অ্যাপ', `https://${process.env.VERCEL_URL}`)],
        [Markup.button.url('📢 জয়েন চ্যানেল', channelLink)]
    ]));
});

// Vercel এর জন্য হ্যান্ডলার
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};
