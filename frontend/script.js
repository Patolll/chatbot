const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chatBox");

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

  userInput.value = "";
});
