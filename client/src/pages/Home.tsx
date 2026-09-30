// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   return (
//     <div className="body page-home">
//       <Navbar />
//       <div className="home-main">
//         <div className="left">
//           <h2>Step into <span className="text-h">Hola Amigo</span></h2>
//           <p>
//             where every 'Hola' opens doors to seamless video connections. Effortlessly catch up with
//             loved ones worldwide with our crisp, reliable video calls. Join our community for immersive
//             conversations that bridge any distance. Start chatting today and feel the warmth of friendship!
//           </p>
//           <Link to="/room"><button className="start">Start Convo</button></Link>
//         </div>
//         <div className="right">
//           <div className="cards">
//             <div className="one"><img src="/img/text_chat.png" alt="chat" /></div>
//             <div className="row">
//               <div className="one"><img src="/img/video_chat.png" alt="video-chat" /></div>
//               <div className="one"><img src="/img/screenshare.png" alt="screenshare" /></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="page page-home">
      <Navbar />
      <section className="hero">
        <div className="hero__copy">
          <h1 className="hero__title">
            Talk face to face, wherever you both are.
          </h1>
          <p className="hero__text">
            NextFace is a video room you can open in one tap — camera, chat and
            screen share, no download needed. Start a call and send the link to
            bring someone in.
          </p>
          <div className="hero__actions">
            <Link to="/room">
              <button className="btn btn--primary">Start a conversation</button>
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="collage">
            <img
              className="collage__item collage__item--a"
              src="/img/video_chat.png"
              alt="Video call preview"
            />
            <img
              className="collage__item collage__item--b"
              src="/img/text_chat.png"
              alt="Text chat preview"
            />
            <img
              className="collage__item collage__item--c"
              src="/img/screenshare.png"
              alt="Screen share preview"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
