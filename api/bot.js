const { Telegraf, Markup } = require('telegraf');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
}
const db = admin.firestore();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const { id, first_name, photo_url } = ctx.from;
    
    // অটো অ্যাকাউন্ট তৈরি
    await db.collection('users').doc(id.toString()).set({
        id, name: first_name, photo: photo_url || '', balance: 0
    }, { merge: true });

    const config = await db.collection('settings').doc('config').get();
    const channelLink = config.exists ? config.data().channelLink : "https://t.me/yourchannel";

    return ctx.replyWithHTML(`স্বাগতম!\nআপনার আইডি কোড: <code>${id}</code>`, Markup.inlineKeyboard([
        [Markup.button.url('📢 জয়েন চ্যানেল', channelLink)]
    ]));
});

module.exports = async (req, res) => { await bot.handleUpdate(req.body); res.status(200).send('OK'); };
