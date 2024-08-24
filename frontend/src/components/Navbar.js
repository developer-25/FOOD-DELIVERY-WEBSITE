import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded={!isNavCollapsed} 
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/MyOrder">My Orders</Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn btn-custom mx-1" to="/login">Login</Link>
                <Link className="btn btn-custom mx-1" to="/CreateUser">Signup</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="btn btn-custom mx-2 position-relative" onClick={() => setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle badge-rounded-pill">
                    {data.length}
                  </Badge>
                </div>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <div className="btn btn-custom mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

// Embedded CSS

const navbarButtonStyles = `
.btn-custom {
  background-color: white;
  color: #28a745; /* Retaining the green color from 'bg-success' */
  border: 2px solid white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.btn-custom:hover {
  background-color: #28a745;
  color: white;
  transform: scale(1.05);
}

.badge-rounded-pill {
  border-radius: 50%;
  font-size: 0.75rem;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${navbarButtonStyles}</style>`);
