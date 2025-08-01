const TelegramBot = require('node-telegram-bot-api');
import { TelegramMessage } from './types';

const CHAVE_API = '8026775706:AAE9gz9bhjg1Ci-2TBa9-qAeNrciFFQmMcM';
const bot = new TelegramBot(CHAVE_API, { polling: true });

// Comando /opcao1
bot.onText(/\/opcao1/, (msg: TelegramMessage) => {
  const chatId = msg.chat.id;
  const texto = `
O que você quer? (Clique em uma opção)
/pizza Pizza
/hamburguer Hamburguer
/salada Salada`;
  bot.sendMessage(chatId, texto);
});

// /pizza
bot.onText(/\/pizza/, (msg: TelegramMessage) => {
  bot.sendMessage(msg.chat.id, "Saindo a pizza para a sua casa: Tempo de espera em 20 min");
});

// /hamburguer
bot.onText(/\/hamburguer/, (msg: TelegramMessage) => {
  bot.sendMessage(msg.chat.id, "Saindo o Brabo: em 10 mim chega ai");
});

// /salada
bot.onText(/\/salada/, (msg: TelegramMessage) => {
  bot.sendMessage(msg.chat.id, "Não tem salada não, clique aqui para iniciar: /iniciar");
});

// /opcao2
bot.onText(/\/opcao2/, (msg: TelegramMessage) => {
  bot.sendMessage(msg.chat.id, "Para enviar uma reclamação, mande um email para reclamacao@teste.com");
});

// /opcao3
bot.onText(/\/opcao3/, (msg: TelegramMessage) => {
  bot.sendMessage(msg.chat.id, "Valeu, Alex mandou um abraço de volta");
});

// Qualquer outra mensagem
bot.on('message', (msg: TelegramMessage) => {
  const texto = msg.text?.toLowerCase();
  if (
    texto === '/opcao1' || texto === '/pizza' || texto === '/hamburguer' ||
    texto === '/salada' || texto === '/opcao2' || texto === '/opcao3'
  ) {
    // Já tratado acima
    return;
  }

  bot.sendMessage(msg.chat.id, `
Escolha uma opção para continuar (Clique no item):
/opcao1 Fazer um pedido
/opcao2 Reclamar de um pedido
/opcao3 Mandar um abraço para o Alex

Responder qualquer outra coisa não vai funcionar, clique em uma das opções.`);
});
