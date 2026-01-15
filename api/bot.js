bot.start(async (ctx) => {
    const { id, first_name } = ctx.from;
    
    // ইউজারের প্রোফাইল পিকচার ইউআরএল সরাসরি বের করা
    let photo_url = 'https://i.pravatar.cc/150'; 
    try {
        const photos = await ctx.telegram.getUserProfilePhotos(id);
        if (photos.total_count > 0) {
            const fileId = photos.photos[0][0].file_id;
            const file = await ctx.telegram.getFile(fileId);
            photo_url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
        }
    } catch (e) { console.log("Photo error", e); }

    // ডাটাবেসে সেভ (ফটোসহ)
    const userRef = db.collection('users').doc(id.toString());
    await userRef.set({
        id: id,
        name: first_name,
        photo: photo_url,
        balance: 0
    }, { merge: true });

    ctx.replyWithHTML(`<b>স্বাগতম ${first_name}!</b>\nআইডি: ${id}`, Markup.inlineKeyboard([
        [Markup.button.url('📢 জয়েন চ্যানেল', 'https://t.me/YourChannel')]
    ]));
});
