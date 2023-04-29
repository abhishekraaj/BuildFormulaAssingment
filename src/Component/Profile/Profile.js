import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Profile.module.css";

export default function Profile() {
  const userData = useSelector((state) => state.matchedUser);
  const allUserData = useSelector((state) => state.userReducer);

  const [toggle, setToggle] = useState(false);
  const [pass, setPass] = useState("");

  const handleUpdatePassword = () => {
    setToggle(!toggle);
  };
  const handleUpdateDone = () => {
    if (!pass) {
      return;
    }
    const index = allUserData.findIndex(
      (el) => el.password === userData.password
    );
    console.log(index);
    userData.password = pass;
    allUserData.splice(index, 1, userData);
    setToggle(false);
    setPass("");
  };
  console.log(allUserData, "allData");
  return (
    <>
      <Navbar />
      <div className={style.main}>
        <h1>My Personal Detail</h1>
        <div className={style.form}>
          <h3>Name : {userData.name}</h3>
          <h3>Age : {userData.age}</h3>
          <h3>Email : {userData.email}</h3>
          <h3>Location : {userData.location}</h3>
          {toggle ? (
            <>
              {" "}
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />{" "}
              <button onClick={handleUpdateDone}>Update Done</button>{" "}
            </>
          ) : (
            <h3>Password : {userData.password}</h3>
          )}
          <button onClick={handleUpdatePassword}>
            {toggle ? "Cancel" : "Update Password"}
          </button>
        </div>
      </div>
    </>
  );
}
