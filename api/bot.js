const { Telegraf, Markup } = require('telegraf');
const admin = require('firebase-admin');

// Firebase Admin Setup
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
}
const db = admin.firestore();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const { id, first_name, last_name, photo_url } = ctx.from;
    const name = first_name + (last_name ? " " + last_name : "");

    // ১. অটো অ্যাকাউন্ট তৈরি (ডাটাবেসে সেভ)
    const userRef = db.collection('users').doc(id.toString());
    const doc = await userRef.get();
    
    if (!doc.exists) {
        await userRef.set({
            id: id,
            name: name,
            photo: photo_url || 'https://i.pravatar.cc/150',
            balance: 0,
            role: 'user',
            createdAt: new Date()
        });
    }

    // ২. এডমিন প্যানেল থেকে চ্যানেল লিংক নিয়ে আসা
    const settings = await db.collection('settings').doc('config').get();
    const channelBtnUrl = settings.exists ? settings.data().channelLink : "https://t.me/YourChannel";

    const welcomeMsg = `<b>স্বাগতম ${name}!</b>\n\nআপনার আইডি কোড: <code>${id}</code>\n\nআমাদের সকল আপডেট পেতে নিচের চ্যানেলে জয়েন করুন।`;

    // ৩. শুধুমাত্র জয়েন চ্যানেল বাটন পাঠানো
    return ctx.replyWithHTML(welcomeMsg, Markup.inlineKeyboard([
        [Markup.button.url('📢 জয়েন চ্যানেল', channelBtnUrl)]
    ]));
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } else {
        res.status(200).send('Bot is running...');
    }
};
