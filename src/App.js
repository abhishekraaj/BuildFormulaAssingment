import SignUp from "./Component/SignUp/SignUp";
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Component/LogIn/LogIn";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
