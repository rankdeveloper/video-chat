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
const form = document.getElementById('form')
let info = document.getElementById('info')
let body1 = document.getElementById('body')

let user=prompt("your name : " , )
// let user;

var peer = new Peer({
  host: '127.0.0.1',
  port: 3030,
  path: '/peerjs',
  config: {
    'iceServers': [
      { url: 'stun:stun01.sipphone.com' },
      { url: 'stun:stun.ekiga.net' },
      { url: 'stun:stunserver.org' },
      { url: 'stun:stun.softjoys.com' },
      { url: 'stun:stun.voiparound.com' },
      { url: 'stun:stun.voipbuster.com' },
      { url: 'stun:stun.voipstunt.com' },
      { url: 'stun:stun.voxgratia.org' },
      { url: 'stun:stun.xten.com' },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ]
  },

  debug: 3
});


// let user;
const getUserValue = () => {
  return new Promise((resolve, reject) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('input').value;
      resolve(user);
    });
  });
};

getUserValue()
  .then(user => {
    info.style.display = "none";
    body1.style.display = "block";
    console.log("user value", user);
  })
  .catch(error => {
    console.error("Error getting user value:", error);
  });

  // alert("user value" , user)

  console.log("Rankush")
  console.log("console user value ",user)

  // alert("user")


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
      console.log('someone call me');
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

  window.onbeforeunload = 
  function (event) {
    event.returnValue = 
    "This document is ready to load";
    socket.emit('user-disconnected' , userName)
  };

const connectToNewUser = (userId, stream) => {
  console.log('I call someone' + userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  call.on("close" , () => {
    video.remove()
  })
};

socket.on('user-disconnected' , (userId) => {
  console.log("disconnect user id : " , userId)
  alert('user disconnected : ',userId)

  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    console.log(video.id)
  if(video.id===userId){
  video.remove();
  }
  })
  })

peer.on("open", (id) => {
  console.log('my id is' + id);
  socket.emit("join-room", ROOM_ID, id, user);
});

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
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
    }</span> </b>
        <span>${message} <br> <i>${new Date().toLocaleTimeString()}</i></span>
      
    </div>`;
});



let chunks = []
function startRecording() {
  // stopBtn.style.display = "block"
  // pauseBtn.style.display = "block"
  // resumeBtn.style.display = "block"
  // recordBtn.style.display = "none"
  mediaRecorder = new MediaRecorder(myVideoStream, { mimeType: 'video/webm; codecs=vp8,opus' });
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
  // stopBtn.style.display = "none"
  // pauseBtn.style.display = "none"
  // resumeBtn.style.display = "none"
  // startBtn.style.display = "block"


  // alert("stopped recording");
  mediaRecorder.stop();
  // videoElement.style.display = "none"
}

function setListeners() {
  mediaRecorder.onstop = handleOnStop;
}

function handleOnStop() {
  saveFile();
  videoTracks.stop();
}

function saveFile() {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl;
  link.download = 'recorded_file.webm';
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
    // Get a stream of the user's screen
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

    // Replace the video track in the local stream with the screen stream track
    const screenTrack = screenStream.getVideoTracks()[0];
    const senders = peer.connections[peer.id].connection.peerConnection.getSenders();
    senders.forEach(sender => {
      if (sender.track.kind === 'video') {
        sender.replaceTrack(screenTrack);
      }
    });

    // Stop the previous video stream and replace it with the screen stream
    myVideoStream.getVideoTracks().forEach(track => track.stop());
    myVideoStream.removeTrack(myVideoStream.getVideoTracks()[0]);
    myVideoStream.addTrack(screenTrack);

    // Update the local video element with the screen stream
    myVideo.srcObject = myVideoStream;

    // Update UI to indicate screen sharing is active
    // You can add code here to toggle buttons or display a message
  } catch (error) {
    console.error('Error sharing screen:', error);
  }
}



