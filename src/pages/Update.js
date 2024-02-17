import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { colRef } from "../firebase-config";
import { getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Update = () => {
  const [edit, setEdit] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const handleEdit = () => {
    edit === true ? setEdit(false) : setEdit(true);
  };
  const { id } = useParams();
  const getData = async () => {
    await getDocs(colRef).then((data) => {
      let note = [];
      data.docs.forEach((document) => {
        note.push({ ...document.data(), id: document.id });
      });
      let arr = note.filter((note) => note.id === id);
      setFilteredData(arr[0]);
    });
  };
  console.log(filteredData);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Nav />
      <div className="max-w-[96%] mx-auto mt-2">
        <div className="container">
          <div className="flex justify-end mb-2">
            <button
              className="text-violet-800 font-bold text-sm px-3 py-2 rounded-2xl"
              onClick={handleEdit}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button className="text-violet-800 font-bold text-sm px-3 py-2 rounded-2xl">
              Save
            </button>
          </div>
          <div className="border border-blue-900 rounded-md text-[1.1rem] font-semibold p-2 mb-2">
            <input
              type="text"
              placeholder="Title here"
              className="w-[100%] border-none outline-none bg-transparent"
              disabled={edit === false ? true : false}
              value={filteredData.title}
            />
          </div>
          <div className="border border-blue-900 rounded-md text-[0.95rem] p-2 mb-2">
            <textarea
              cols="30"
              rows="10"
              className="w-[100%] border-none outline-none bg-transparent"
              placeholder="Text here"
              disabled={edit === false ? true : false}
              value={filteredData.note}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
