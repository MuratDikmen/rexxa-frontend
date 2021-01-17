import React, { useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const Tinder = ({ user }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getInitialOne = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get("https://tinder-for-therapists-backend.herokuapp.com/api/recommend/");
      if (!res.data.err) {
        console.log(res.data);
        setCurrentUser({
          _id: res.data.randomTherapist._id,
          name: res.data.randomTherapist.name,
          email: res.data.randomTherapist.email,
          pictureURL: res.data.randomTherapist.pictureURL,
          practice_type: res.data.randomTherapist.practice_type,
          cultural_background: res.data.randomTherapist.cultural_background,
        });
      }
    };
    getInitialOne();
    //eslint-disable-next-line
  }, []);

  const likeAndGetNextOne = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(currentUser._id);
    const payload = {
      therapistId: currentUser._id,
    };
    try {
      const update = await axios.put(`https://tinder-for-therapists-backend.herokuapp.com/api/recommend/like`, payload, config);
      const res = await axios.get("https://tinder-for-therapists-backend.herokuapp.com/api/recommend/");
      console.log(res);
      setCurrentUser({
        _id: res.data.randomTherapist._id,
        name: res.data.randomTherapist.name,
        email: res.data.randomTherapist.email,
        pictureURL: res.data.randomTherapist.pictureURL,
        practice_type: res.data.randomTherapist.practice_type,
        cultural_background: res.data.randomTherapist.cultural_background,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeAndGetNextOne = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(currentUser._id);
    const payload = {
      therapistId: currentUser._id,
    };
    try {
      const update = await axios.put(`https://tinder-for-therapists-backend.herokuapp.com/api/recommend/dislike`, payload, config);
      const res = await axios.get("https://tinder-for-therapists-backend.herokuapp.com/api/recommend/");
      console.log(res);
      setCurrentUser({
        _id: res.data.randomTherapist._id,
        name: res.data.randomTherapist.name,
        email: res.data.randomTherapist.email,
        pictureURL: res.data.randomTherapist.pictureURL,
        practice_type: res.data.randomTherapist.practice_type,
        cultural_background: res.data.randomTherapist.cultural_background,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={currentUser.pictureURL} alt="" width="100%" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Name</span> <br />
          {currentUser.name}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Practice Type</span> <br />
          {currentUser.practice_type}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Cultural Background</span> <br /> {currentUser.cultural_background}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={dislikeAndGetNextOne} style={buttonStyle}>
          <i class="fas fa-times" style={{ color: "#db4040", fontSize: "32px" }}></i>
        </button>
        <button onClick={likeAndGetNextOne} style={buttonStyle}>
          <i style={{ color: "#36ebc0", fontSize: "32px" }} class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: "#fff",
  border: "2px solid #f0f2f2",
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  margin: "2rem",
};

export default Tinder;
