import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const [usertype, setusertype] = useState("user");
  const [click, setClick] = useState(false);

  const { email, password, userType } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password, userType });
  };

  const goToLoginForm = () => {
    setClick(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "100px" }}>
      {click ? (
        <Fragment>
          <h1 style={headerStyle}>Login</h1>
          <p style={{ marginTop: "20px", fontWeight: "700", color: "#913d88", textAlign: "center", fontSize: "20px" }}>
            Please enter login details, then press Login to continue:
          </p>
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
              <label htmlFor="therapist">Therapist Login</label>
              <input required type="radio" id="therapist" name="userType" value="Therapist" onChange={onChange} />
              <label htmlFor="user">User Login</label>
              <input required type="radio" id="user" name="userType" value="User" onChange={onChange} />
            </div> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="email" style={{ color: "#674172", fontSize: "30px", fontWeight: "500" }}>
                Email:
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="form-input"
                placeholder="Email"
                style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ color: "#674172", fontSize: "30px", fontWeight: "500" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="form-input"
                placeholder="Password"
                style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
              <input
                type="submit"
                value="Login"
                style={{
                  backgroundColor: "rgb(145, 61, 136)",
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: "500",
                  border: "0",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "150px",
                }}
              />
            </div>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <div
            style={{
              backgroundColor: "rgb(94, 80, 181)",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#fff",
              }}
            >
              REXXA
            </span>
          </div>
          <h1 style={headerStyle}>Tinder for Therapy</h1>
          <button
            onClick={goToLoginForm}
            style={{
              backgroundColor: "rgb(145, 61, 136)",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "500",
              border: "0",
              borderRadius: "8px",
              padding: "10px",
              marginTop: "60px",
              width: "150px",
            }}
          >
            Login
          </button>
          <Link to="/register">
            <button
              onClick={goToLoginForm}
              style={{
                backgroundColor: "rgb(145, 61, 136)",
                color: "#fff",
                fontSize: "28px",
                fontWeight: "500",
                border: "0",
                borderRadius: "8px",
                padding: "10px",
                marginTop: "10px",
                width: "150px",
              }}
            >
              Sign Up
            </button>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

const headerStyle = { fontSize: "48px", fontWeight: "bold", color: "#913d88", textAlign: "center" };

export default Login;
