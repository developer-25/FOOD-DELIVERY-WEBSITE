import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top custom-footer-bg">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <img src="/path-to-your-logo.png" alt="GoFood Logo" className="footer-logo" />
          </Link>
          <span className="text-muted">© 2023 GoFood, Inc</span>
        </div>
      </footer>
    </div>
  );
}

// Embedded CSS

const footerStyles = `
.custom-footer-bg {
  background-color: #28a745; /* Matching the Navbar color */
  color: white;
}

.footer-logo {
  height: 30px;
  margin-right: 10px;
}

.text-muted {
  color: rgba(255, 255, 255, 0.7) !important;
}

footer {
  padding: 1rem 2rem;
  font-size: 0.9rem;
}

footer a {
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

footer a:hover {
  color: #fff;
  text-decoration: none;
}

.border-top {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${footerStyles}</style>`);
