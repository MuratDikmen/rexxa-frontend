import React, { useState, useContext } from "react";
import AuthContext from "../contexts/auth/authContext";

const Onboarding = () => {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({
    currentStep: 1,
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    preferences: [],
  });

  const [toggle, setToggle] = useState({
    on: [],
    off: [
      "Addiction",
      "Anxiety",
      "Assault",
      "Career",
      "Depression",
      "Domestic Violence",
      "Eating Disorder",
      "Family",
      "Recovery",
      "Relationship",
      "School",
      "Stress",
      "Other",
    ],
  });

  const { firstname, lastname, age, gender } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const goNextPage = () => {
    let current = state.currentStep;
    if (current === 3) {
      //submit form and change first_time_user to false
    } else {
      current = current + 1;
      setState({ ...state, currentStep: current });
    }
  };

  const goPreviousPage = () => {
    let current = state.currentStep;
    current = current - 1;
    setState({ ...state, currentStep: current });
  };

  const submitData = () => {
    console.log(state);
    const userProfile = {
      _id: authContext.user._id,
      user_type: authContext.user.user_type,
      firstname: state.firstname,
      lastname: state.lastname,
      age: state.age,
      gender: state.gender,
      preferences: state.preferences,
    };
    authContext.completeOnboarding(userProfile);
  };

  const toggleSelection = (name) => {
    let prefs = state.preferences;
    prefs.includes(name) ? (prefs = prefs.filter((e) => e !== name)) : prefs.push(name);
    setState({ ...state, preferences: prefs });
    console.log(state.preferences);
    let on = toggle.on;
    let off = toggle.off;
    if (off.includes(name)) {
      on.push(name);
      off = off.filter((e) => e !== name);
    } else {
      off.push(name);
      on = on.filter((e) => e !== name);
    }
    setToggle({ ...toggle, on: on, off: off });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "100px" }}>
      {state.currentStep === 1 ? (
        <div style={{ textAlign: "center" }}>
          <h1 style={headerStyle}>Welcome!</h1>
          <p style={{ marginTop: "2rem", fontWeight: "700", color: "#913d88", textAlign: "center", fontSize: "20px" }}>
            To start, you'll be answering a series of questions so we can find theraphists that best match your needs and wants.
          </p>
          <p style={{ marginTop: "20px", fontWeight: "700", color: "#913d88", textAlign: "center", fontSize: "20px" }}>
            Of course, you'll ultimately get to choose which therapists you're interested in contacting one-on-one!
          </p>
          <p style={{ marginTop: "20px", fontWeight: "700", color: "#913d88", textAlign: "center", fontSize: "20px" }}>
            Press Start when ready.
          </p>
          <button
            onClick={goNextPage}
            style={{
              backgroundColor: "rgb(145, 61, 136)",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "500",
              border: "0",
              borderRadius: "8px",
              padding: "10px 5px",
              marginTop: "2rem",
              width: "10rem",
            }}
          >
            Start
          </button>
        </div>
      ) : state.currentStep === 2 ? (
        <div>
          <h1 style={headerStyle}>Personal Info</h1>
          <form
            style={{
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              marginTop: "20px",
            }}
          >
            <label
              htmlFor="firstname"
              style={{ marginTop: "1rem", color: "#c992c9", fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}
            >
              What is your First Name?
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={onChange}
              style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
            />
            <label
              htmlFor="lastname"
              style={{ marginTop: "1rem", color: "#c992c9", fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}
            >
              What is your Last Name?
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={lastname}
              onChange={onChange}
              style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
            />
            <label
              htmlFor="age"
              style={{ marginTop: "1rem", color: "#c992c9", fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}
            >
              How old are you?
            </label>
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={age}
              onChange={onChange}
              style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
            />
            <label
              htmlFor="gender"
              style={{ marginTop: "1rem", color: "#c992c9", fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem" }}
            >
              What is your Gender?
            </label>
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              value={gender}
              onChange={onChange}
              style={{ width: "90%", padding: "1rem", borderRadius: "8px", border: "1px solid rgb(103, 65, 114)", fontSize: "20px" }}
            />
          </form>
          {/* <button onClick={goPreviousPage} >Back</button> */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <button
              onClick={goNextPage}
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
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 style={headerStyle}>Preferences</h1>
          <p
            style={{ padding: "0rem 1rem", marginTop: "2rem", fontWeight: "700", color: "#913d88", textAlign: "center", fontSize: "20px" }}
          >
            What areas are you looking for help in?
          </p>
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "30% 30% 30%", gridGap: "1rem", padding: "0rem 1rem" }}>
            <div
              style={toggle.on.includes("Addiction") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Addiction")}
            >
              Addiction
            </div>
            <div
              style={toggle.on.includes("Anxiety") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Anxiety")}
            >
              Anxiety
            </div>
            <div
              style={toggle.on.includes("Assault") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Assault")}
            >
              Assault
            </div>
            <div
              style={toggle.on.includes("Career") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Career")}
            >
              Career
            </div>
            <div
              style={toggle.on.includes("Depression") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Depression")}
            >
              Depression
            </div>
            <div
              style={toggle.on.includes("Domestic Violence") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Domestic Violence")}
            >
              Domestic Violence
            </div>
            <div
              style={toggle.on.includes("Eating Disorder") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Eating Disorder")}
            >
              Eating Disorder
            </div>
            <div
              style={toggle.on.includes("Family") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Family")}
            >
              Family
            </div>
            <div
              style={toggle.on.includes("Recovery") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Recovery")}
            >
              Recovery
            </div>
            <div
              style={toggle.on.includes("Relationship") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Relationship")}
            >
              Relationship
            </div>
            <div
              style={toggle.on.includes("School") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("School")}
            >
              School
            </div>
            <div
              style={toggle.on.includes("Stress") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Stress")}
            >
              Stress
            </div>
            <div
              style={toggle.on.includes("Other") ? divStyleOn : divStyleOff}
              className="selection"
              onClick={() => toggleSelection("Other")}
            >
              Other
            </div>
          </div>
          {/* <button onClick={goPreviousPage}>Back</button> */}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
            <button
              onClick={submitData}
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
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const headerStyle = { fontSize: "48px", fontWeight: "bold", color: "#913d88", textAlign: "center" };

const divStyleOn = {
  backgroundColor: "rgb(170, 0, 170)",
  color: "#fff",
  fontSize: "16px",
  width: "6rem",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  borderRadius: "8px",
  textAlign: "center",
};

const divStyleOff = {
  backgroundColor: "rgba(170, 0, 170, .50)",
  color: "#fff",
  fontSize: "16px",
  width: "6rem",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  borderRadius: "8px",
  textAlign: "center",
};

export default Onboarding;
