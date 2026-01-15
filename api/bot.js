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
    try {
        const { id, first_name, last_name } = ctx.from;
        const fullName = first_name + (last_name ? " " + last_name : "");

        let userPhoto = "https://i.pravatar.cc/150";
        try {
            const photos = await ctx.telegram.getUserProfilePhotos(id);
            if (photos.total_count > 0) {
                const fileId = photos.photos[0][0].file_id;
                const file = await ctx.telegram.getFile(fileId);
                userPhoto = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
            }
        } catch (e) {}

        await db.collection('users').doc(id.toString()).set({
            id: id, name: fullName, photo: userPhoto, balance: 0, role: 'user'
        }, { merge: true });

        const config = await db.collection('settings').doc('config').get();
        const chLink = config.exists ? config.data().channelLink : "https://t.me/yourchannel";

        return ctx.replyWithHTML(`<b>স্বাগতম ${fullName}!</b>\n\nআপনার আইডি কোড: <code>${id}</code>\nচ্যানেলে জয়েন করুন:`, 
            Markup.inlineKeyboard([[Markup.button.url('📢 জয়েন চ্যানেল', chLink)]])
        );
    } catch (err) { console.error(err); }
});

module.exports = async (req, res) => {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
};
