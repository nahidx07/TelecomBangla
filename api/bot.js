const { Telegraf, Markup } = require('telegraf');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
}
const db = admin.firestore();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const { id, first_name, last_name, username } = ctx.from;
    const name = first_name + (last_name ? " " + last_name : "");
    
    // ১. প্রোফাইল ফটো বের করা
    let photo_url = "https://i.pravatar.cc/150";
    try {
        const photos = await ctx.telegram.getUserProfilePhotos(id);
        if (photos.total_count > 0) {
            const fileId = photos.photos[0][0].file_id;
            const file = await ctx.telegram.getFile(fileId);
            photo_url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
        }
    } catch (e) {}

    // ২. অটো অ্যাকাউন্ট তৈরি/আপডেট
    await db.collection('users').doc(id.toString()).set({
        id: id, name: name, photo: photo_url, balance: 0, role: 'user'
    }, { merge: true });

    // ৩. এডমিন থেকে চ্যানেল লিংক আনা
    const config = await db.collection('settings').doc('config').get();
    const chLink = config.exists ? config.data().channelLink : "https://t.me/yourchannel";

    return ctx.replyWithHTML(`<b>স্বাগতম ${name}!</b>\n\nআপনার আইডি কোড: <code>${id}</code>\nচ্যানেলে জয়েন করুন:`, 
        Markup.inlineKeyboard([[Markup.button.url('📢 জয়েন চ্যানেল', chLink)]])
    );
});

module.exports = async (req, res) => {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
};
