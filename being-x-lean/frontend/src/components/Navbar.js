import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">BEING<span className="logo-accent">_X_</span>LEAN</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/workout" className={`nav-link ${isActive('/workout') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Workout</Link>
          <Link to="/diet" className={`nav-link ${isActive('/diet') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Diet</Link>

          {user ? (
            <>
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <span className="nav-avatar">
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0).toUpperCase()}
                </span>
                Profile
              </Link>
              <button className="btn-outline nav-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="btn-primary nav-cta" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
