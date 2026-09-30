import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = (
  <>
    <Link to="/room">Convo</Link>
    <Link to="/about">About us</Link>
    <Link to="/contact">Feedback</Link>
  </>
);

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="logo">
      <h3>Next<span>Face</span></h3>
      <nav className="desktop-nav">{links}</nav>
      {children}
      <div className="mobile-menu">
        <button className="hamburger-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`mobile-nav ${open ? "active" : ""}`} onClick={() => setOpen(false)}>
          {links}
        </nav>
      </div>
    </div>
  );
}
