import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark custom-bg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fw-bold" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                <Link className="btn btn-outline-light mx-2" to="/login">Login</Link>
                <Link className="btn btn-outline-light mx-2" to="/CreateUser">Signup</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="btn btn-light mx-2 position-relative" onClick={() => setCartView(true)}>
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
                <div className="btn btn-danger mx-2" onClick={handleLogout}>
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

const navbarStyles = `
.custom-bg {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  padding: 1rem 1.5rem;
}

.navbar-brand {
  color: #fff !important;
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.nav-link {
  color: #f0f0f0 !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #cce7ff !important;
}

.btn-outline-light {
  color: #fff;
  border: 2px solid #fff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #2a5298;
}

.btn-light {
  color: #2a5298;
  background-color: #fff;
  border: 2px solid transparent;
  transition: transform 0.3s ease;
}

.btn-light:hover {
  transform: scale(1.05);
}

.btn-danger {
  color: #fff;
  background-color: #e63946;
  border: 2px solid transparent;
  transition: transform 0.3s ease;
}

.btn-danger:hover {
  transform: scale(1.05);
}

.badge-rounded-pill {
  border-radius: 50%;
  font-size: 0.75rem;
}

.navbar-toggler-icon {
  filter: invert(1);
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.5rem;
  }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${navbarStyles}</style>`);
