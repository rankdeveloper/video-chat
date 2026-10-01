import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimations } from "../hooks/useAnimations";

const links = (
  <>
    <Link to="/room">Convo</Link>
    <Link to="/about">About us</Link>
    <Link to="/contact">Feedback</Link>
  </>
);

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { slideDown } = useAnimations();

  return (
    <motion.header className="logo" {...slideDown()}>
      <h3 onClick={() => navigate("/")}>
        Next<span>Face</span>
      </h3>
      <nav className="desktop-nav">{links}</nav>
      {children}
      <div className="mobile-menu">
        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          className={`mobile-nav ${open ? "active" : ""}`}
          onClick={() => setOpen(false)}
        >
          {links}
        </nav>
      </div>
    </motion.header>
  );
}
