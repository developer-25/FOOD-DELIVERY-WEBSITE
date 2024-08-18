import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
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
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={styles.background}>
      <div className="container" style={styles.container}>
        <form onSubmit={handlesubmit} style={styles.form}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="exampleInputEmail1" className="form-label" style={styles.label}>
              Email address
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
          <button type="submit" className="btn btn-success" style={styles.submitButton}>
            Submit
          </button>
          <Link to="/CreateUser" className="btn btn-danger" style={styles.newUserButton}>
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(https://example.com/food-background.jpg)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  formText: {
    fontSize: '12px',
    color: '#888',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  newUserButton: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: '#fff',
    borderRadius: '5px',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};
