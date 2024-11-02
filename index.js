require('dotenv').config()

const { Bot, GrammyError, HttpError, Keyboard } = require('grammy')
const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
    {command: "start", description: "Почати спілкування з ботом"},
    {command: "address", description: "Дізнатися адресу занять"},
    {command: "schedule", description: "Дізнатися розклад занять"},
])

/* bot.command('start', async (ctx) => {
    await ctx.reply(`Привіт, ${ctx.from.first_name}, Вас вітає інструктор з йоги!`)
}) */

bot.command('start', async (ctx) => {
    const startKeyboard = new Keyboard().text('Дізнатися адресу занять').row().text('Дізнатися розклад занять').row().text('Дізнатися більше про тренування')
    await ctx.reply(`Привіт, ${ctx.from.first_name}, Вас вітає інструктор з йоги!`,
        {
            reply_markup: startKeyboard
        }
    )
})

bot.hears(/адрес/, async (ctx) => {
    await ctx.reply('Адреса занять: Masarykova tř. 2421/66')
})

bot.on('message', async (ctx) => {
    await ctx.react('❤')
    await ctx.reply('Дякую за повідомлення')
    //console.log(ctx.from.first_name)
})



bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start()