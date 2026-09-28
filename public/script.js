const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

// const user = prompt("Enter your name");
const form = document.getElementById("form");
const input = document.getElementById("input");
const info = document.getElementById("info");
const body1 = document.getElementById("body");

// let user = prompt("Enter your name : ");

let user = "";

window.addEventListener("DOMContentLoaded", () => {
  const nameModal = document.getElementById("nameModal");
  const nameInput = document.getElementById("customNameInput");
  const nameSubmit = document.getElementById("customNameSubmit");

  function submitName() {
    const value = nameInput.value.trim();
    if (value) {
      user = value;
      nameModal.style.display = "none";
      // Enable chat
      document.getElementById("chat_message").disabled = false;
      document.getElementById("send").disabled = false;
      // Now emit join-room here, after user is set!
      peer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id, user);
      });
    } else {
      nameInput.focus();
    }
  }

  nameSubmit.addEventListener("click", submitName);
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitName();
  });
});
var peer = new Peer({
  host: "localhost",
  port: 3030,
  path: "/peerjs",
  config: {
    iceServers: [
      { url: "stun:stun01.sipphone.com" },
      { url: "stun:stun.ekiga.net" },
      { url: "stun:stunserver.org" },
      { url: "stun:stun.softjoys.com" },
      { url: "stun:stun.voiparound.com" },
      { url: "stun:stun.voipbuster.com" },
      { url: "stun:stun.voipstunt.com" },
      { url: "stun:stun.voxgratia.org" },
      { url: "stun:stun.xten.com" },
      {
        url: "turn:192.158.29.39:3478?transport=udp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        url: "turn:192.158.29.39:3478?transport=tcp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
    ],
  },

  debug: 3,
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      console.log("someone call me");
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

window.onbeforeunload = function (event) {
  event.returnValue = "This document is ready to load";
  socket.emit("user-disconnected", userName);
};

const connectToNewUser = (userId, stream) => {
  console.log("I call someone" + userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  call.on("close", () => {
    video.remove();
  });
};

socket.on("user-disconnected", (userId) => {
  console.log("disconnect user id : ", userId);
  alert("user disconnected : ", userId);

  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    console.log(video.id);
    if (video.id === userId) {
      video.remove();
    }
  });
});

// console.log("username1 : ", user);
// peer.on("open", (id) => {
//   console.log("my id is" + id);
//   socket.emit("join-room", ROOM_ID, id, user);
// });

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video" data-tooltip="Hide camera"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt("Share this link to your friend : ", window.location.href);
});

socket.on("createMessage", (message, userName) => {
  console.log("createMessage : ", userName);

  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName == user ? "me" : userName
        }</span> </b>
        <span>${message} <br> <i>${new Date().toLocaleTimeString()}</i></span>
      
    </div>`;

  console.log("username", userName);
  console.log("user", user);
});

let chunks = [];
function startRecording() {
  document.getElementById("startRecording").style.display = "none";
  document.getElementById("stopRecording").style.display = "flex";

  mediaRecorder = new MediaRecorder(myVideoStream, {
    mimeType: "video/webm; codecs=vp8,opus",
  });
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      console.log(e.data);
      chunks.push(e.data);
    }
  };
  setListeners();
  mediaRecorder.start();
}

function stopRecording() {
  document.getElementById("stopRecording").style.display = "none";
  document.getElementById("startRecording").style.display = "flex";
  mediaRecorder.stop();
}

function setListeners() {
  mediaRecorder.onstop = handleOnStop;
}

function handleOnStop() {
  saveFile();
  videoTracks.stop();
}

function saveFile() {
  const blob = new Blob(chunks, { type: "video/webm" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = blobUrl;
  link.download = "recorded_file.webm";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
  chunks = [];
}

const screenShareButton = document.querySelector("#screenShareButton");

screenShareButton.addEventListener("click", () => {
  startScreenSharing();
});

async function startScreenSharing() {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    // Replace the video track in the local stream with the screen stream track
    const screenTrack = screenStream.getVideoTracks()[0];
    const senders =
      peer.connections[peer.id].connection.peerConnection.getSenders();
    senders.forEach((sender) => {
      if (sender.track.kind === "video") {
        sender.replaceTrack(screenTrack);
      }
    });

    myVideoStream.getVideoTracks().forEach((track) => track.stop());
    myVideoStream.removeTrack(myVideoStream.getVideoTracks()[0]);
    myVideoStream.addTrack(screenTrack);
    myVideo.srcObject = myVideoStream;
  } catch (error) {
    console.error("Error sharing screen:", error);
  }
}
