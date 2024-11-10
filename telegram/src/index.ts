import { Input, Telegraf } from "telegraf";
import dotenv from "dotenv";
import { downloadMemeReport } from "./MemeReport";
dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);

bot.start((ctx) =>
  ctx.reply("Hi there! Type /report to download your meme report!")
);

bot.command("report", async (ctx) => {
  const data = await downloadMemeReport();
  await ctx.replyWithDocument(Input.fromLocalFile("./reports/meme-report.csv"));
});

bot.launch();
console.log("Hepmil Memes Telegram bot has started!");

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
