import { useState, useEffect } from "react";
import style from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { state } from "../../Const/constantData";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  console.log(userData, "from reducer");
  console.log(location);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regEmail.test(email)) {
      setRegEmail("");
    } else if (!regEmail.test(email) && email !== "") {
      setRegEmail("Email is Not Valid");
    }
  };

  const handleClick = () => {
    if (!email || !location || !name || !age) {
      alert("Please fill the input box");
    } else if (regEmail === "EMAIL IS NOT VALID") {
      alert("You enter wrong details");
    } else {
      const newUser = {
        email,
        name,
        password: "@" + name + Math.floor(Math.random() * 1000),
        location,
        age
      };
      dispatch({ type: "ADD_USER", payload: newUser });
      setEmail("");
      setName("");
      setAge("");
      alert(`Your temporary password is ${newUser.password}`);
      navigate("/login");
    }
  };
  return (
    <>
      <div className={style.main}>
        <h1>Sign Up</h1>
        <div className={style.form}>
          <input value={email} onChange={handleEmail} placeholder="Email" />

          {regEmail}

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
          />
          <select onChange={(e) => setLocation(e.target.value)}>
            <option>State</option>
            {state.map((state) => {
              return (
                <option key={state} value={state}>
                  {state}
                </option>
              );
            })}
          </select>

          <button onClick={handleClick}>Sign Up</button>
        </div>
      </div>
    </>
  );
}
