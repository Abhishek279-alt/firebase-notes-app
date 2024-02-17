import React from "react";
import { app } from "../firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("auth_token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="max-w-[96%] mx-auto">
      <div className="container flex flex-row justify-center items-center h-[100vh]">
        <button
          className="text-[1rem] font-semibold bg-violet-800 text-white py-1 px-3 rounded-md"
          onClick={handleLogin}
        >
          <span>Sign in with Google </span>
          <i className="fa-brands fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default Login;
