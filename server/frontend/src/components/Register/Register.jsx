import React, { useState } from "react";

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: { margin: 0 },
  close: { textDecoration: "none", fontSize: "24px", color: "#333" },
  label: { display: "block", fontWeight: "bold", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "darkturquoise",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Sign Up</h2>
          <a href="/" style={styles.close} aria-label="Close">
            &times;
          </a>
        </div>

        <form onSubmit={register}>
          <label style={styles.label} htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            style={styles.input}
            required
            onChange={(e) => setUserName(e.target.value)}
          />

          <label style={styles.label} htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            placeholder="First Name"
            style={styles.input}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label style={styles.label} htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Last Name"
            style={styles.input}
            required
            onChange={(e) => setLastName(e.target.value)}
          />

          <label style={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            style={styles.input}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="psw"
            placeholder="Password"
            style={styles.input}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Register" style={styles.button} />
        </form>
      </div>
    </div>
  );
};

export default Register;