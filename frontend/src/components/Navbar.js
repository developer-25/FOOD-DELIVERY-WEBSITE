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
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <div className="d-flex flex-wrap align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
              <li className="nav-item mx-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item mx-2">
                  <Link className="nav-link fs-5" to="/MyOrder">My Orders</Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn btn-custom mx-1" to="/login">Login</Link>
                  <Link className="btn btn-custom mx-1" to="/CreateUser">Signup</Link>
                </>
              ) : (
                <>
                  <div className="btn btn-custom mx-2 position-relative" onClick={() => setCartView(true)}>
                    My Cart{" "}
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
                </>
              )}
            </div>
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

.navbar-nav .nav-link {
  margin-right: 1rem;
}

.container-fluid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .navbar-brand {
    font-size: 1.5rem; /* Smaller brand font size */
  }
  
  .nav-link {
    font-size: 1.25rem; /* Adjust link size */
  }

  .btn-custom {
    padding: 0.4rem 0.8rem; /* Adjust padding for smaller screens */
    font-size: 0.9rem; /* Slightly smaller font size */
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.25rem; /* Even smaller brand font size */
  }
  
  .nav-link {
    font-size: 1rem; /* Adjust link size */
  }

  .btn-custom {
    padding: 0.3rem 0.7rem; /* Adjust padding for smaller screens */
    font-size: 0.85rem; /* Slightly smaller font size */
  }

  .navbar-nav {
    flex-direction: column; /* Stack nav items vertically */
  }

  .btn-custom, .navbar-nav .nav-link {
    margin: 0.5rem 0; /* Adjust margin for stacked items */
  }
}

@media (max-width: 576px) {
  .navbar-brand {
    font-size: 1rem; /* Smallest brand font size */
  }
  
  .nav-link {
    font-size: 0.9rem; /* Smallest link size */
  }

  .btn-custom {
    padding: 0.25rem 0.5rem; /* Adjust padding for smallest screens */
    font-size: 0.8rem; /* Smallest font size */
  }
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = navbarButtonStyles;
document.head.appendChild(styleSheet);
