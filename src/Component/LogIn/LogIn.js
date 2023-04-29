import { useState } from "react";
import style from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userData, "from login page");
  const handleClick = () => {
    const userFind = userData.find(
      (el) => el.name === name && el.password === password
    );
    console.log(userFind, "finderUser");
    if (userFind !== undefined) {
      alert(`${userFind.name} successfully login`);
      dispatch({ type: "LOGIN", payload: true });
      dispatch({ type: "LOGGUSER", payload: userFind });
      navigate("/home");
    } else {
      alert("User Not Found Or Please fill the details correctly");
    }
  };
  return (
    <>
      <div className={style.main}>
        <h1>Sign In</h1>
        <div className={style.form}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button onClick={handleClick}>Sign In</button>
        </div>
      </div>
    </>
  );
}
