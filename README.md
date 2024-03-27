## Visão Geral

Esta documentação fornece informações que consiste em uma aplicação web para upload, processamento e visualização de frames de vídeos.

### Tecnologias Utilizadas

- **Frontend (Community)**:
  - Node
  - React
  - TypeScript

- **Backend (Server)**:
  - Node.js
  - Express
  - TypeScript
  - Firebase Admin SDK
  - ffmpeg (para processamento de vídeo)
  

## Configuração do Ambiente de Desenvolvimento
*Obs: O projeto foi feito com uma estrutura de monorepositorio para ambas as aplicações*

1. Clone o repositório:
    `git clone <URL_DO_REPOSITORIO>`

### Server

1. Navegue até o diretório do Server:
    `cd server`

2. Instale as dependências:
    `npm install`

4. Baixe as credenciais do [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup?hl=pt-br) e anexe na raiz do server
*obs: altere o nome do arquivo JSON para `serviceAccountKey`*

3. Inicie o servidor de desenvolvimento:
    `npm start`

### Community

1. Navegue até o diretório do Server:
    `cd community`

2. Instale as dependências:
    `npm install`

3. Inicie o servidor de desenvolvimento:
    `npm start`

## Funcionalidades

### Frontend

1. **Página de Upload**: Permite aos usuários fazer upload de vídeos.
2. **Página de Listagem**: Exibe uma lista de vídeos enviados com informações como nome do arquivo, quantidade de frames, etc.
3. **Página de Visualização**: Permite aos usuários visualizar os frames de um vídeo específico.

### Backend

1. **Rota `/upload`**: Recebe um vídeo enviado pelo usuário, extrai os frames e os armazena no Firebase Storage.
2. **Rota `/list`**: Retorna uma lista de metadados dos vídeos enviados, incluindo informações como id, nome do arquivo, quantidade de frames, etc.
3. **Rota `/frames/:id`**: Retorna os frames de um vídeo específico.
