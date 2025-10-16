
const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjAwYjcwMjY3MDIwYjk4ZDQ3NjVkZCIsImVtYWlsIjoibmV5bWFyQGRldmNvbm5lY3QuY29tIiwiaWF0IjoxNzYwNTcyOTkwLCJleHAiOjE3NjA1NzY1OTB9.vxggWKLupHN61ZepCut4cxPqqT4ki-o9YHO2dlsT6U0";
const receiverId = "68f036e283a6d807e9503b47";

socket.on("connect", () => {
  console.log("🟢 Usuário A conectado");
  socket.emit("authenticate", token);
});

socket.on("message_sent", (msg) => console.log("📤 Enviado:", msg?.content || msg));
socket.on("receive_message", (msg) => console.log("📩 Recebido:", msg?.content || msg));
socket.on("error", (err) => console.log("❌ Erro:", err));

setTimeout(() => {
  const payload = {
    token: token,
    receiverId: receiverId,
    content: "Fala dev! 👋", 
  };


  socket.emit("send_message", payload);
}, 3000);