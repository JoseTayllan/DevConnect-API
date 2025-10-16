# 💻 DevConnect API

**DevConnect** é uma plataforma backend desenvolvida em **Node.js + TypeScript**, criada para **conectar desenvolvedores** e permitir **interações sociais em tempo real** — como criar perfis, postar conteúdo, seguir outros devs e conversar via chat instantâneo.

## 🚀 Tecnologias Utilizadas
| Categoria | Tecnologia |
|------------|-------------|
| **Linguagem** | TypeScript |
| **Runtime** | Node.js (v18+) |
| **Framework Web** | Express |
| **Banco de Dados** | MongoDB + Mongoose |
| **Autenticação** | JWT (JSON Web Token) + Bcrypt |
| **Segurança** | Helmet, CORS |
| **Documentação** | Swagger UI + Swagger JSDoc |
| **Tempo Real** | Socket.IO |
| **Testes** | Jest + Supertest |
| **Variáveis de Ambiente** | Dotenv |
| **Logs e Observabilidade** | console + mensagens sem ruído |

## 🧱 Arquitetura e Estrutura de Pastas
A API segue o padrão **Clean Architecture**, com separação clara de responsabilidades:
```
src/
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── routes/
 ├── services/
 ├── sockets/
 ├── app.ts
 └── server.ts
```

## 🧩 Funcionalidades Implementadas
- Autenticação e CRUD de usuários
- Perfis de devs com bio, skills e links
- Postagens com curtidas e comentários
- Conexões (seguir e deixar de seguir)
- Chat em tempo real com Socket.IO

## 🧠 Boas Práticas Aplicadas
- Clean Architecture
- Type Safety (TypeScript)
- Middleware de autenticação
- RESTful API
- Swagger documentado
- Tratamento de erros centralizado
- Helmet + CORS
- Variáveis .env
- Código modular

## ⚙️ Como Rodar o Projeto
```bash
npm install
cp .env.example .env
npm run dev
```

## 🧾 Documentação da API (Swagger)
Acesse: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

## 💬 Testar Chat em Tempo Real
Use dois scripts Node.js (client1.js e client2.js) conectando com Socket.IO e enviando mensagens entre usuários.

## 🧭 Próximos Passos
| Etapa | Descrição |
|--------|------------|
| Etapa 7 | Notificações em tempo real |
| Etapa 8 | Deploy (Render / Railway) |
| Etapa 9 | Frontend (React ou Angular) |
| Etapa 10 | Testes automatizados |
| Etapa 11 | Logs e métricas |
| Etapa 12 | CI/CD com GitHub Actions |

## 🧰 Aprendizados
- API REST escalável e modular
- Autenticação JWT no Express e Socket.IO
- Swagger + Socket.IO integrados
- Clean Code e segurança aplicada

## 🧠 Autor
**Neymar Jr.** — Desenvolvedor Backend  
📧 Contato: seuemail@devconnect.com  
📚 #NodeJS #TypeScript #APIs #WebSockets #MongoDB #CleanCode
