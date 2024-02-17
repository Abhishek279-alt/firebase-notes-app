import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase-config";
import { getAuth, signOut } from "firebase/auth";

const Nav = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-violet-800 text-white md:py-4 py-1 flex flex-row justify-evenly fixed bottom-0 md:static w-[100%]">
      <div>
        <Link to="/" className="flex flex-col items-center">
          <span>
            <i className="fa-solid fa-house"></i>
          </span>
          <span className="md:text-sm text-xs">Home</span>
        </Link>
      </div>
      <div>
        <Link
          to="/form"
          className="flex flex-col justify-center items-center bg-white text-blue-900 md:w-[2.5rem] w-[2rem] md:h-[2.5rem] h-[2rem] mt-1 md:mt-0 rounded-full"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      <div>
        <Link className="flex flex-col items-center" onClick={handleLogout}>
          <span>
            <i className="fa-solid fa-right-from-bracket"></i>
          </span>
          <span className="md:text-sm text-xs">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
