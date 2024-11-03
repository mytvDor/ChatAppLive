(function () {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      let username = app.querySelector(".join-screen #username").ariaValueMax;

      if (username.length == 0) {
        return;
      }
      socket.emit("newuser", username);
      uname = username;
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
    });

  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message,
      });
      app.querySelector(".chat-screen #message-input").value = "";
    });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type == "my") {
      let e1 = document.createElement("div");
      el.setAttribute("class", "message my-message");
    } else if (type == "other") {
    } else if (type == "update") {
    }
  }
})();
