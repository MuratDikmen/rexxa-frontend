import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/auth/authContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
    userType: "User",
  });

  const { email, password, password2, userType } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(userType);
    register({ email, password, userType });
  };

  return (
    <div style={{ paddingTop: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1 style={headerStyle}>Sign Up</h1>
      <form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          marginTop: "20px",
        }}
      >
        {/* <div>
          <label htmlFor="therapist">Therapist</label>
          <input required type="radio" id="therapist" name="userType" value="Therapist" onChange={onChange} />
          <label htmlFor="user">User</label>
          <input required type="radio" id="user" name="userType" value="User" onChange={onChange} />
        </div> */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ color: "#674172", fontSize: "30px", fontWeight: "500" }} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Email"
            style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
          />

          <label style={{ marginTop: "1rem", color: "#674172", fontSize: "30px", fontWeight: "500" }} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
            placeholder="Password"
            style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
          />

          <label style={{ marginTop: "1rem", color: "#674172", fontSize: "30px", fontWeight: "500" }} htmlFor="password2">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
            placeholder="Confirm Password"
            style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
          />
          <label style={{ marginTop: "1rem", color: "#674172", fontSize: "30px", fontWeight: "500" }} htmlFor="usertype">
            Are you a
          </label>
          <select
            name="userType"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid rgb(103, 65, 114)",
              fontSize: "20px",
            }}
            onChange={onChange}
          >
            <option value="User" onChange={onChange}>
              User
            </option>
            <option value="Therapist" onChange={onChange}>
              Therapist
            </option>
          </select>
        </div>
        <input
          type="submit"
          value="Create Account"
          style={{
            backgroundColor: "rgb(145, 61, 136)",
            color: "#fff",
            fontSize: "28px",
            fontWeight: "500",
            border: "0",
            borderRadius: "8px",
            padding: "10px 5px",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        />
      </form>
    </div>
  );
};
const headerStyle = { fontSize: "48px", fontWeight: "bold", color: "#913d88", textAlign: "center" };

export default Register;
