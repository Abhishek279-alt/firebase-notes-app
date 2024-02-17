import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { colRef } from "../firebase-config";
import { getDocs } from "firebase/firestore";

const Home = () => {
  const [notesData, setNotesData] = useState([]);
  let userId = JSON.parse(localStorage.getItem("user")).uid;
  let arr = notesData.filter((note) => note.uid === userId);
  console.log(arr);
  console.log(userId);
  useEffect(() => {
    getDocs(colRef).then((data) => {
      let notes = [];
      data.docs.forEach((document) => {
        notes.push({ ...document.data(), id: document.id });
      });
      setNotesData(notes);
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-[96%] mx-auto mt-2">
        <div className="container">
          {arr.map((notes) => {
            return (
              <div className="bg-blue-200 rounded-md p-2 mb-2" key={notes.id}>
                <Link to={`/update/${notes.id}`}>
                  <h3 className="md:text-[2rem] text-[0.95rem] font-bold">
                    {notes.title}
                  </h3>
                  <p className="md:text-[1.25rem] text-[0.75rem] font-semibold">
                    This is a random text. This is a random text.
                  </p>
                </Link>
                <hr />
                <div className="mt-2 flex justify-center py-2">
                  <button className="ml-2 bg-violet-800 rounded-md w-[100%] text-white">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
