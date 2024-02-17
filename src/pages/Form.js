import React, { useState } from "react";
import Nav from "./Nav";
import { colRef } from "../firebase-config";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user.uid;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    addDoc(colRef, { uid, title, note });
    navigate("/");
  };
  return (
    <>
      <Nav />
      <div className="max-w-[96%] mx-auto mt-2">
        <div className="container">
          <div className="flex justify-end mb-2">
            <button
              className="text-violet-800 font-bold text-sm px-3 py-2 rounded-2xl"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <div className="border border-blue-900 rounded-md text-[1.1rem] font-semibold p-2 mb-2">
            <input
              type="text"
              placeholder="Title here"
              className="w-[100%] border-none outline-none bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="border border-blue-900 rounded-md text-[0.95rem] p-2 mb-2">
            <textarea
              cols="30"
              rows="10"
              className="w-[100%] border-none outline-none bg-transparent"
              placeholder="Text here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
