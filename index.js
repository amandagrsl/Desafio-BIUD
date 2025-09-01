const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const chatRoutes = require('./routes/chatRoutes');
console.log("chatRoutes importado");

const messageRoutes = require('./routes/messageRoutes');
console.log("messageRoutes importado");

app.use('/api/chats', chatRoutes);
console.log("Rotas de chats registradas em /api/chats");

app.use('/api/chats/:chatId/messages', messageRoutes);
console.log("Rotas de mensagens registradas em /api/chats/:chatId/messages");

app.get('/', (_req, res) => {
  res.send('Backend BIUD funcionando!');
});

require('./whatsappService');

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


