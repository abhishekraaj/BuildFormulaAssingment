import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.matchedUser);
  console.log(currentUser, "curent user");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGIN", payload: false });
    navigate("/");
  };
  return (
    <>
      <div className={style.nav}>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <div className={style.logout}>
          <p>{currentUser?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}
