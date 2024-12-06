const chatHistory = document.getElementById("chatHistory");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    const messageElement = document.createElement("div");

    if (data.type === "message") {
      messageElement.textContent = data.message;
      messageElement.classList.add("message");
    } else if (data.type === "info") {
      messageElement.textContent = data.message;
      messageElement.classList.add("system-message");
    }

    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  } catch (error) {
    console.error("Ошибка при обработке сообщения:", error);
  }
};

const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message) {
    ws.send(message);
    messageInput.value = "";
  }
};

sendMessageButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
