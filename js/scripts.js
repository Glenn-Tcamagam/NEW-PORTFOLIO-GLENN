/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener("DOMContentLoaded", function () {

  const chatbotButton = document.getElementById("chatbot-button");
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeBtn = document.getElementById("close-chatbot");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const messages = document.getElementById("chatbot-messages");

  // OUVRIR
  chatbotButton.addEventListener("click", function () {
    chatbotContainer.style.display = "flex";
  });

  // FERMER
  closeBtn.addEventListener("click", function () {
    chatbotContainer.style.display = "none";
  });

  // ENVOYER MESSAGE
  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const question = userInput.value.trim();
    if (!question) return;

    addMessage(question, "message-user");
    userInput.value = "";

    addMessage("⏳ Réflexion en cours...", "message-bot");

    try {
      const response = await fetch("https://ragmcdonalds.duckdns.org/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      messages.lastChild.remove();
      addMessage(data.answer, "message-bot");

    } catch (error) {
      messages.lastChild.remove();
      addMessage("❌ Erreur de connexion à l'API", "message-bot");
    }
  }

});
