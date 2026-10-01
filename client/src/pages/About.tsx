import { Video, MessageSquare, Monitor, Download, Zap, Shield, GitBranch, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAnimations } from "../hooks/useAnimations";

const features = [
  { icon: <Video size={22} />, title: "HD Video Calls", desc: "Crystal-clear video powered by WebRTC — no plugins, no downloads." },
  { icon: <MessageSquare size={22} />, title: "Live Chat", desc: "Send messages during a call without interrupting the conversation." },
  { icon: <Monitor size={22} />, title: "Screen Share", desc: "Share your entire screen or a single window with one click." },
  { icon: <Download size={22} />, title: "Record & Download", desc: "Record your session locally and download it as a .webm file." },
  { icon: <Zap size={22} />, title: "Instant Rooms", desc: "Create a room in seconds and share the link — no sign-up needed." },
  { icon: <Shield size={22} />, title: "Peer-to-Peer", desc: "Media streams go directly between browsers, never through a server." },
];

const stats = [
  { value: "P2P", label: "Direct connection" },
  { value: "0ms", label: "Sign-up time" },
  { value: "WebRTC", label: "Powered by" },
  { value: "Open", label: "Source" },
];

export default function About() {
  const { fadeUp, stagger, cardVariant } = useAnimations();

  return (
    <div className="page page-about">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero__glow" />
        <motion.p className="about-hero__eyebrow" {...fadeUp(0)}>About the project</motion.p>
        <motion.h1 className="about-hero__title" {...fadeUp(0.1)}>
          Video calls that just <span>work</span>.
        </motion.h1>
        <motion.p className="about-hero__sub" {...fadeUp(0.2)}>
          NextFace is a browser-based video chat app — open a room, share the
          link, and you're talking. No accounts, no installs, no friction.
        </motion.p>
      </section>

      <motion.div className="about-stats" variants={stagger} initial="initial" animate="animate">
        {stats.map((s) => (
          <motion.div className="about-stat" key={s.label} variants={cardVariant}>
            <span className="about-stat__value">{s.value}</span>
            <span className="about-stat__label">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <section className="about-features">
        <motion.h2 className="about-section-title" {...fadeUp(0)}>Everything you need</motion.h2>
        <motion.div className="about-grid" variants={stagger} initial="initial" animate="animate">
          {features.map((f) => (
            <motion.div className="about-card" key={f.title} variants={cardVariant}>
              <div className="about-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="about-dev">
        <motion.div className="about-dev__card" {...fadeUp(0.1)}>
          <div className="about-dev__avatar">R</div>
          <div className="about-dev__info">
            <p className="about-dev__role">Built by</p>
            <h3 className="about-dev__name">Rankush</h3>
            <p className="about-dev__bio">
              Full-stack developer passionate about real-time communication and
              building tools that feel effortless to use.
            </p>
            <div className="about-dev__links">
              <a href="https://github.com/rankdeveloper" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitBranch size={18} />
              </a>
              <a href="#" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
