const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chatBox");
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
sendButton.addEventListener("click", () => {
  if (userInput.value.trim() === "") {
    alert("Please enter a message.");
    return;
  }
  const userMessageElement = userInput.value;

  const userContainer = document.createElement("div");
  const userMessage = document.createElement("div");
  const userIconBox = document.createElement("div");
  const userIcon = document.createElement("i");

  userMessage.innerText = userMessageElement;

  userContainer.classList.add("user-container");
  userMessage.classList.add("user-message");
  userIconBox.classList.add("user-icon");
  userIcon.classList.add("fa-solid", "fa-face-smile", "fa-xl");

  userIconBox.appendChild(userIcon);
  userContainer.appendChild(userMessage);
  userContainer.appendChild(userIconBox);

  chatBox.appendChild(userContainer);
  fetchData(userMessageElement);
  userInput.value = "";
});
function fetchData(userMessageElement) {
  fetch("../backend/chat.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      message: userMessageElement,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      const botMessage = data.response;
      const botContainer = document.createElement("div");
      const botMessageElement = document.createElement("div");
      const botIconBox = document.createElement("div");
      const botIcon = document.createElement("i");
      botMessageElement.innerText = botMessage;
      botContainer.classList.add("bot-container");
      botMessageElement.classList.add("bot-message");
      botIconBox.classList.add("bot-icon");
      botIcon.classList.add("fa-solid", "fa-robot", "fa-xl");
      botIconBox.appendChild(botIcon);
      botContainer.appendChild(botIconBox);
      botContainer.appendChild(botMessageElement);
      chatBox.appendChild(botContainer);
      chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
