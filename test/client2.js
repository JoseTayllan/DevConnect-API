
const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjAzNmUyODNhNmQ4MDdlOTUwM2I0NyIsImVtYWlsIjoibWVzc2lAZGV2Y29ubmVjdC5jb20iLCJpYXQiOjE3NjA1NzMxNjYsImV4cCI6MTc2MDU3Njc2Nn0.qjoGO_SVTKG5RxOmzQOWZfqv8XPXojN6hwrNnTX9nbg";

socket.on("connect", () => {
  console.log("🟢 Usuário B conectado");
  socket.emit("authenticate", token);
});

socket.on("receive_message", (msg) => console.log("📩 Nova mensagem:", msg.content));