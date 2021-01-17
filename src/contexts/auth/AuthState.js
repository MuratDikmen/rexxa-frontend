import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, LOGOUT, SET_LIKES } from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("https://tinder-for-therapists-backend.herokuapp.com/api/auth");
      // const res = await axios.get("http://localhost:5000/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const registerData = { name: formData.name, email: formData.email, password: formData.password };
    try {
      if (formData.userType === "Therapist") {
        const res = await axios.post("https://tinder-for-therapists-backend.herokuapp.com/api/therapists", registerData, config);
        // const res = await axios.post("http://localhost:5000/api/therapists", registerData, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        loadUser();
      } else {
        // const res = await axios.post("http://localhost:5000/api/users", registerData, config);
        const res = await axios.post("https://tinder-for-therapists-backend.herokuapp.com/api/users", registerData, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        loadUser();
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData);
    const loginData = { email: formData.email, password: formData.password };
    try {
      if (formData.userType === "Therapist") {
        const res = await axios.post("https://tinder-for-therapists-backend.herokuapp.com/api/auth/therapist", loginData, config);
        // const res = await axios.post("http://localhost:5000/api/auth/therapist", loginData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        loadUser();
      } else {
        // const res = await axios.post("http://localhost:5000/api/auth/user", loginData, config);
        const res = await axios.post("https://tinder-for-therapists-backend.herokuapp.com/api/auth/user", loginData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        loadUser();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Complete onboarding
  const completeOnboarding = async (userProfile) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      if (userProfile.user_type === "Therapist") {
        const res = await axios.put(
          `https://tinder-for-therapists-backend.herokuapp.com/api/therapist${userProfile._id}`,
          userProfile,
          config
        );
        // const res = await axios.put(`http://localhost:5000/api/therapists/${userProfile._id}`, userProfile, config);
        loadUser();
        dispatch({ type: USER_LOADED, payload: res.data });
      } else {
        // const res = await axios.put(`http://localhost:5000/api/users/${userProfile._id}`, userProfile, config);
        const res = await axios.put(
          `https://tinder-for-therapists-backend.herokuapp.com/api/users/${userProfile._id}`,
          userProfile,
          config
        );
        loadUser();
        dispatch({ type: USER_LOADED, payload: res.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        likes: state.likes,
        loadUser,
        register,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
