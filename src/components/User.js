import React from "react";
import Onboarding from "./Onboarding";
import Tinder from "./Tinder";

const User = ({ user }) => {
  return user.first_time_user ? <Onboarding user={user} /> : <Tinder user={user} />;
};

export default User;
