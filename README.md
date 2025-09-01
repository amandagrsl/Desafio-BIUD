## BIUD WhatsApp Bot

## Descrição do Projeto
O BIUD WhatsApp Bot é uma aplicação que conecta-se ao WhatsApp via QR Code, 
monitora chats e responde automaticamente a mensagens recebidas. 
O projeto utiliza Node.js para o backend e simula respostas automáticas simples.

## Funcionalidades entregues:
1. Conexão ao WhatsApp via QR Code.
2. Monitoramento de chats e mensagens recebidas.
3. Respostas automáticas pré-definidas.

Observação: Devido a limitações de tempo e bugs durante o desenvolvimento,
a aplicação não implementa respostas dinâmicas de IA completas.
O foco foi nas funcionalidades que conseguimos entregar com estabilidade.

## Tecnologias Utilizadas
- Backend: Node.js, Express.js
- Banco de Dados: MySQL
- Integração WhatsApp: whatsapp-web.js

Frontend: Não implementado completamente (apenas testes locais)
Outras dependências: Axios (para chamadas HTTP), dotenv (variáveis de ambiente)

## Pré-requisitos
Antes de executar o projeto, você precisa ter instalado em sua máquina:
- Node.js (v20 ou superior)
- NPM
- MySQL

## Configuração do Projeto
- Clone o repositório:
git clone https://github.com/amandagrsl/Desafio-BIUD

- Acesse a pasta do backend:
cd biud-backend

- Instale as dependências:
npm install

- Configure o arquivo .env com suas variáveis de ambiente:
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=biud

- Inicialize o banco de dados (tabelas chats e messages devem estar criadas).

## Executando a Aplicação
- Inicie o servidor backend:
node index.js

- Abra o WhatsApp Web com o QR Code exibido no terminal para conectar a sua conta.
O backend estará rodando em:
http://localhost:3000

## Testes
Testes básicos implementados:
- Validação de conexão ao banco de dados.
- Testes unitários simples para as funções de leitura de mensagens e envio de respostas automáticas.

## Exemplo de teste usando node (simples console.log):
const { getChats } = require('./models/chatModel');

getChats().then(chats => {
  console.log("Chats encontrados:", chats.length);
}).catch(err => console.error(err));

## Observações
- O projeto entrega a parte principal de integração com WhatsApp e respostas automáticas básicas.
- O frontend não foi implementado completamente; todas as interações são feitas via backend.
- Limitações de tempo impediram a implementação completa de IA para respostas dinâmicas.

## Link do Repositório
O código completo do projeto pode ser acessado em:
<insira-aqui-o-link-do-seu-repositorio-no-github-ou-gitlab>
