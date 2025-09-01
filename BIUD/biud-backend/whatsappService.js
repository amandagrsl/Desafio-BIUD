
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { upsertChat } = require('./models/chatModel');
const { createMessage } = require('./models/messageModel');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { 
    headless: false,          
    args: ['--no-sandbox']    
  }
});


const respostasAutomatica = [
  { trigger: /qual é o seu nome\??/i, resposta: "Eu sou AmandaBot, sua assistente virtual." },
  { trigger: /você conhece a BIUD Tecnologia\??/i, resposta: "Conheço sim. A BIUD é solução que unifica o seu marketing com as vendas." },
  { trigger: /tudo bem\??/i, resposta: "Tudo sim, e com você?" },
  { trigger: /obrigad[oa]/i, resposta: "De nada! 😄" },
  { trigger: /bom dia/i, resposta: "Bom dia! Eu sou AmandaBot! Como posso te ajudar?" },
  { trigger: /boa tarde/i, resposta: "Boa tarde! Eu sou AmandaBot! Como posso te ajudar?" },
  { trigger: /tchau|até logo|até mais/i, resposta: "Até logo! Obrigada pela preferência! 😄" },
  { trigger: /^oi$/i, resposta: "Oi! Eu sou AmandaBot, sua assistente virtual. Como posso te ajudar?" },
  { trigger: /^ol[áa]$/i, resposta: "Olá! Eu sou AmandaBot, sua assistente virtual. Como posso te ajudar?" }
];

function buscarResposta(mensagem) {
  for (const item of respostasAutomatica) {
    if (item.trigger.test(mensagem.trim())) {
      return item.resposta;
    }
  }
  return "Desculpe, ainda não sei a resposta para isso, mas estou aprendendo!";
}

client.on('qr', (qr) => {
  console.log('QR Code gerado, escaneie com seu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp conectado com sucesso!');
});

client.on('message', async (message) => {
  try {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);

  
    await upsertChat(message.from, `Chat ${message.from}`, message.body);

    await createMessage({
      chat_id: message.from,
      from_me: 0,
      sender: message._data.notifyName || 'Desconhecido',
      body: message.body,
      type: message.type
    });

    const resposta = buscarResposta(message.body);

    await client.sendMessage(message.from, resposta);

    await createMessage({
      chat_id: message.from,
      from_me: 1,
      sender: 'AmandaBot',
      body: resposta,
      type: 'text'
    });

    console.log(`Resposta enviada para ${message.from}: ${resposta}`);
  } catch (err) {
    console.error('Erro ao processar mensagem:', err);
  }
});

client.on('disconnected', (reason) => {
  console.log('Cliente desconectado:', reason);
});

client.initialize();

module.exports = client;
