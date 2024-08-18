import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }));
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={styles.background}>
      <div className="container" style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Create Your Account</h2>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="name" className="form-label" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              style={styles.input}
            />
          </div>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="exampleInputEmail1" className="form-label" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={styles.input}
            />
            <div id="emailHelp" className="form-text" style={styles.formText}>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="exampleInputPassword1" className="form-label" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              style={styles.input}
            />
          </div>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="exampleInputGeolocation" className="form-label" style={styles.label}>
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputGeolocation"
              style={styles.input}
            />
          </div>
          <button type="submit" className="btn btn-success" style={styles.submitButton}>
            Sign Up
          </button>
          <Link to="/login" className="btn btn-danger" style={styles.newUserButton}>
            Already a User? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'linear-gradient(to right, rgba(255, 200, 150, 0.7), rgba(255, 100, 100, 0.7)), url(https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Replace with a high-quality food-related image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    marginBottom: '30px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    color: '#555',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  formText: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  },
  submitButton: {
    marginTop: '25px',
    padding: '12px 20px',
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    color: '#fff',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  newUserButton: {
    marginTop: '15px',
    padding: '12px 20px',
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: '#fff',
    borderRadius: '25px',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

// Add hover effects to buttons
const buttonHoverStyles = `
  .btn-success:hover {
    background-color: #218838 !important;
  }
  .btn-danger:hover {
    background-color: #c82333 !important;
  }
`;

// Inject hover styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = buttonHoverStyles;
document.head.appendChild(styleSheet);
