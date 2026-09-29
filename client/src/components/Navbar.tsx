import { useState } from "react";
import { Link } from "react-router-dom";

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
      <h3>hola<span>AMIGO</span></h3>
      <nav className="desktop-nav">{links}</nav>
      {children}
      <div className="mobile-menu">
        <div className={`hamburger ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </div>
        <nav className={`mobile-nav ${open ? "active" : ""}`} onClick={() => setOpen(false)}>{links}</nav>
      </div>
    </div>
  );
}
