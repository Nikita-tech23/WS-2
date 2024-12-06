const WebSocket = require("ws");

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on("connection", (ws) => {
  console.log("Новый клиент подключен");
  clients.push(ws);

  ws.send(JSON.stringify({ type: "info", message: "Добро пожаловать в чат!" }));

  ws.on("message", (message) => {
    const parsedMessage =
      message instanceof Buffer ? message.toString("utf8") : message; // Преобразуем Buffer в строку

    console.log(`Получено сообщение: ${parsedMessage}`);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ type: "message", message: parsedMessage })
        ); // Отправляем только текст
      }
    });
  });

  ws.on("close", () => {
    console.log("Клиент отключился");
    clients = clients.filter((client) => client !== ws);
  });
});

console.log(`Сервер запущен на ws://localhost:${PORT}`);
