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
    <div className="w-1/4 h-screen border-r-2 border-dashed border-[#333333] flex flex-col">
      {" "}
      <div className="flex flex-col justify-center m-3 border-b-2 border-dashed border-[#333333] pb-4 ">
        {" "}
        <input
          ref={inputRef}
          type="text"
          className="p-2 px-4 rounded-full text-white text-sm font-semibold bg-[#333333] my-2"
          placeholder="Group Name"
        />{" "}
        <button
          className="bg-[#272727] p-2 px-4 rounded-full text-white text-sm font-semibold"
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
                className="text-white p-2 w-full px-4 rounded-full bg-[#333333]"
                onClick={() => navigate("/" + i.btn)}
              >
                {i.btn}
              </button>
              <button
                onClick={() => {
                  deletButton(index);
                  navigate("/");
                }}
                className="p-2 px-4 rounded-full bg-[#333333] ml-2"
              >
                delet
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Groups;
