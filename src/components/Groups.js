import React, { useRef, useState } from "react";
import { useNavigate, withRouter } from "react-router-dom";
const Groups = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [buttons, setButtons] = useState(
    JSON.parse(localStorage.getItem("store")) || []
  );
  console.log(buttons);
  function createButton(x) {
    setButtons((c) => {
      const newButtons = [...c, x];
      localStorage.setItem("store", JSON.stringify(newButtons));
      return newButtons;
    });
  }
  function deletButton(index) {
    setButtons((c) => {
      const newButtons = [...c];
      newButtons.splice(index, 1);
      localStorage.setItem("store", JSON.stringify(newButtons));
      return newButtons;
    });
  }
  return (
    <div className=" h-screen border-r-2 border-dashed border-[#333333] flex flex-col">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-[#333333] rounded-2xl m-3 drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#151515] text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col justify-center m-3 border-b-2 border-dashed border-[#333333] pb-4 ">
              <input
                ref={inputRef}
                type="text"
                className="p-2 px-4 rounded-full text-white text-sm font-semibold bg-[#333333] my-2"
                placeholder="Group Name"
              />
              <button
                className="bg-[#272727] p-2 px-4 rounded-full text-white text-sm font-semibold hover:bg-purple-700 transition duration-300 ease-in-out"
                onClick={() => {
                  if (inputRef.current.value.trim() != "") {
                    createButton({ btn: inputRef.current.value });
                    inputRef.current.value = "";
                  }
                }}
              >
                Create Group
              </button>
            </div>
            <div className="flex flex-col mx-3 overflow-y-auto">
              {buttons.map((i, index) => {
                return (
                  <div key={index} className="mb-2 flex w-full">
                    <button
                      className="text-white p-2 w-full px-4 rounded-full bg-[#333333] hover:bg-blue-700 transition duration-300 ease-in-out"
                      onClick={() => navigate("/" + i.btn)}
                    >
                      {i.btn}
                    </button>
                    <button
                      onClick={() => {
                        deletButton(index);
                        navigate("/");
                      }}
                      className="p-2 px-4 rounded-full bg-[#333333] ml-2 hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                      delet
                    </button>
                  </div>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Groups;
