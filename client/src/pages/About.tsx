import {
  Video,
  MessageSquare,
  Monitor,
  Download,
  Zap,
  Shield,
  GitBranch,
  Globe,
} from "lucide-react";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <Video size={22} />,
    title: "HD Video Calls",
    desc: "Crystal-clear video powered by WebRTC — no plugins, no downloads.",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Live Chat",
    desc: "Send messages during a call without interrupting the conversation.",
  },
  {
    icon: <Monitor size={22} />,
    title: "Screen Share",
    desc: "Share your entire screen or a single window with one click.",
  },
  {
    icon: <Download size={22} />,
    title: "Record & Download",
    desc: "Record your session locally and download it as a .webm file.",
  },
  {
    icon: <Zap size={22} />,
    title: "Instant Rooms",
    desc: "Create a room in seconds and share the link — no sign-up needed.",
  },
  {
    icon: <Shield size={22} />,
    title: "Peer-to-Peer",
    desc: "Media streams go directly between browsers, never through a server.",
  },
];

const stats = [
  { value: "P2P", label: "Direct connection" },
  { value: "0ms", label: "Sign-up time" },
  { value: "WebRTC", label: "Powered by" },
  { value: "Open", label: "Source" },
];

export default function About() {
  return (
    <div className="page page-about">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <p className="about-hero__eyebrow">About the project</p>
        <h1 className="about-hero__title">
          Video calls that just <span>work</span>.
        </h1>
        <p className="about-hero__sub">
          NextFace is a browser-based video chat app — open a room, share the
          link, and you're talking. No accounts, no installs, no friction.
        </p>
      </section>

      {/* Stats */}
      <div className="about-stats">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat__value">{s.value}</span>
            <span className="about-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="about-features">
        <h2 className="about-section-title">Everything you need</h2>
        <div className="about-grid">
          {features.map((f) => (
            <div className="about-card" key={f.title}>
              <div className="about-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Developer */}
      <section className="about-dev">
        <div className="about-dev__card">
          <div className="about-dev__avatar">R</div>
          <div className="about-dev__info">
            <p className="about-dev__role">Built by</p>
            <h3 className="about-dev__name">Rankush</h3>
            <p className="about-dev__bio">
              Full-stack developer passionate about real-time communication and
              building tools that feel effortless to use.
            </p>
            <div className="about-dev__links">
              <a
                href="https://github.com/rankdeveloper"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitBranch size={18} />
              </a>
              <a href="#" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
