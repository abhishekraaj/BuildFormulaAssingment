import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { state } from "../../Const/constantData";
export default function Home() {
  const [post, setPost] = useState("");
  const [search, setSearch] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const postList = useSelector((state) => state.postReducer);
  const allUserList = useSelector((state) => state.userReducer);
  const loginStatus = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
  });

  const handleAddPost = () => {
    if (!post) {
      return;
    }
    const newPost = {
      id: Math.floor(Math.random() * 1000),
      post
    };
    dispatch({ type: "ADD_POST", payload: newPost });
    setPost("");
  };

  const handleDeletePost = (el) => {
    dispatch({ type: "DELETE_POST", payload: el });
  };
  return (
    <>
      <Navbar />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.input}>
            <textarea value={post} onChange={(e) => setPost(e.target.value)} />
            <button onClick={handleAddPost}>+</button>
          </div>

          <div>
            <h3>POSTS</h3>
            {postList.map((el) => {
              return (
                <div className={style.addPost}>
                  <p>{el.post}</p>
                  <button onClick={() => handleDeletePost(el)}>{"❌"}</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className={style.users}>
          <h3>ALL USERS LIST</h3>
          <div className={style.search}>
            <input
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              placeholder="Search by age"
              value={searchAge}
              onChange={(e) => setSearchAge(e.target.value)}
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
            <button onClick={() => setShow(!show)}>Change View</button>
          </div>
          <div className={show ? style.cardContainer : ""}>
            {allUserList
              .filter((el) => el.location.includes(location))
              .filter((el) => el.age.includes(searchAge))
              .filter((el) =>
                el.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((el) => {
                return (
                  <div className={show ? style.card : style.list}>
                    <p>{el.name}</p>
                    <p>{el.age}</p>
                    <p>{el.location}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
