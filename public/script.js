
    const socket = io("http://localhost:8888");

    let username = document.getElementById("username");
    let message = document.getElementById("message");
    let send = document.getElementById("send");

    let messagesOut = document.getElementById("messagesOut");
    let feedback = document.getElementById("feedback");
    let output = document.getElementById("output");


    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && message.value !== "") {
          send.click();
          feedback.innerHTML = "";
          socket.emit("typing", "");
        }
      });
      message.addEventListener("keypress", () => {
        socket.emit("typing", username.value);
      });
      function scrolltoBottom() {
        output.scrollTop = output.scrollHeight;
      }

      send.addEventListener("click", () => {
        let data = {
          username: username.value,
          message: message.value,
        };
        if(data.username === "" || data.message === ""){
            return;
        }
        socket.emit("message", data);
        socket.emit("typing", "");
        feedback.innerHTML = "";
        message.value = "";
        scrolltoBottom();
    });



    socket.on("message", (data) => {
        //   console.log(data);
        messagesOut.innerHTML += `<div><strong>${data.username} : </strong> <em style="color: #027bff">${data.message}</em></div><br>`;
    });

    socket.on("typing", (data) => {
        feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
        setTimeout(() => {
          feedback.innerHTML = "";
        }, 3000);
        scrolltoBottom();
    });
