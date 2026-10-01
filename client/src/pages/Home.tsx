import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAnimations } from "../hooks/useAnimations";

export default function Home() {
  const { fadeUp, scaleIn } = useAnimations();

  return (
    <div className="page page-home">
      <Navbar />
      <section className="hero">
        <div className="hero__copy">
          <motion.h1 className="hero__title" {...fadeUp(0)}>
            Talk face to face, wherever you both are.
          </motion.h1>
          <motion.p className="hero__text" {...fadeUp(0.12)}>
            NextFace is a video room you can open in one tap — camera, chat and
            screen share, no download needed. Start a call and send the link to
            bring someone in.
          </motion.p>
          <motion.div className="hero__actions" {...fadeUp(0.22)}>
            <Link to="/room">
              <button className="btn btn--primary">Start a conversation</button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <div className="collage">
            <img className="collage__item collage__item--a" src="/img/video_chat.png" alt="Video call preview" />
            <img className="collage__item collage__item--b" src="/img/text_chat.png" alt="Text chat preview" />
            <img className="collage__item collage__item--c" src="/img/screenshare.png" alt="Screen share preview" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
