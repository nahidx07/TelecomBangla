const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
    const APP_URL = "https://your-vercel-link.vercel.app";

    if (req.method === 'POST') {
        const { message } = req.body;

        if (message && message.text === '/start') {
            const chatId = message.chat.id;
            const text = "স্বাগতম টেলিকম বাংলায়! নিচের বাটনে ক্লিক করে অফার দেখুন।";

            const payload = {
                chat_id: chatId,
                text: text,
                reply_markup: {
                    inline_keyboard: [[
                        { text: "Open App 📱", web_app: { url: APP_URL } }
                    ]]
                }
            };

            await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
    }
    res.status(200).send('OK');
};
