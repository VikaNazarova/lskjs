import Plugin from './Plugin';

export default class DebugPlugin extends Plugin {
  name = 'DebugPlugin';
  async runBot(bot, name) {
    await this.runLogger(bot, name);
    await this.runPing(bot, name);
    await this.runChatId(bot, name);
  }
  async runPing(bot) {
    bot.on('message', (ctx) => {
      if (!bot.isMessageCommand(ctx, 'ping')) return;
      ctx.reply(`pong 2`);

      bot.reply(ctx, `pong`);
    });
  }
  async runChatId(bot) {
    bot.on('message', (ctx) => {
      if (bot.provider === 'telegram' && bot.isMessageCommands(ctx, ['id', 'ид'])) {
        bot.reply(ctx, ctx.message.reply_to_message ? ctx.message.reply_to_message.from.id : ctx.message.from.id);
        return;
      }
      if (bot.provider === 'telegram' && bot.isMessageCommands(ctx, ['chatid', 'чат'])) {
        bot.reply(
          ctx,
          [ctx.message.from && `UserId: ${ctx.message.from.id}`, ctx.message.chat && `ChatId: ${ctx.message.chat.id}`]
            .filter(Boolean)
            .join('\n'),
        );
      }
    });
  }
  async runLogger(bot) {
    const { BotsEventModel, BotsTelegramMessageModel } = this.app.models;
    const { provider } = bot;
    bot.eventTypes.forEach((type) => {
      bot.on(type, (ctx) => {
        let eventData;
        if (provider === 'telegram' && type === 'message') {
          eventData = ctx.message;
          this.log.trace(`<${this.name}/${bot.name}> [${type}]`, eventData);
          BotsTelegramMessageModel.create({
            botId: bot.getBotId(),
            ...eventData,
          });
          // } else if (provider === 'discord') {
          //   console.log(ctx);
        } else {
          this.log.warn(`<${this.name}/${bot.name}> [${type}] LOGGER NOT IMPLEMENTED`);
        }
        BotsEventModel.create({
          botId: bot.getBotId(),
          type,
          data: eventData,
        });
      });
    });
  }
}
