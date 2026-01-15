const { Telegraf, Markup } = require('telegraf');
const admin = require('firebase-admin');

// Firebase Initialization
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
        });
    } catch (e) {
        console.error('Firebase Admin Error:', e);
    }
}
const db = admin.firestore();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    try {
        const { id, first_name, last_name, photo_url } = ctx.from;
        const name = first_name + (last_name ? " " + last_name : "");

        // ইউজার ডাটা সেভ
        await db.collection('users').doc(id.toString()).set({
            id: id,
            name: name,
            photo: photo_url || '',
            balance: 0,
            role: 'user'
        }, { merge: true });

        // এডমিন থেকে চ্যানেল লিংক আনা
        const config = await db.collection('settings').doc('config').get();
        const channelBtnUrl = config.exists ? config.data().channelLink : "https://t.me/YourChannel";

        const msg = `<b>স্বাগতম ${name}!</b>\n\nআপনার আইডি কোড: <code>${id}</code>\n\nচ্যানেলে জয়েন করুন:`;

        return ctx.replyWithHTML(msg, Markup.inlineKeyboard([
            [Markup.button.url('📢 জয়েন চ্যানেল', channelBtnUrl)]
        ]));
    } catch (err) {
        console.error('Bot Start Error:', err);
    }
});

// Vercel Serverless Function Handler
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    } else {
        res.status(200).send('Bot is running...');
    }
};
