import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth/authContext";
import Theraphist from "./Theraphist";
import User from "./User";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();

    //eslin-disable-next-line
  }, []);

  return authContext.user === null ? (
    <div></div>
  ) : authContext.user.user_type === "Therapist" ? (
    <Theraphist user={authContext.user} />
  ) : (
    <User user={authContext.user} />
  );
};

export default Home;
