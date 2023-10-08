import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Chats = () => {
  const param = useParams();
  console.log(param.id);

  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem(param.id)) || []
  );

  let texts = [];
  texts = JSON.parse(localStorage.getItem(param.id));

  console.log(chats);
  const inputRef = useRef(null);

  function addChat(x) {
    setChats((c) => {
      const newChats = [...c, x];
      localStorage.setItem(param.id, JSON.stringify(newChats));
      return newChats;
    });
  }

  function deletChat(index) {
    setChats((c) => {
      const newChats = [...c];
      newChats.splice(index, 1);
      localStorage.setItem(param.id, JSON.stringify(newChats));
      return newChats;
    });
  }

  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const time = `${hours}:${minutes} ${ampm}`;
    return { date, time };
  }

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <div className="h-full mx-4 mt-4 overflow-y-auto bg-[#1f1f1f]  rounded-lg">
        <div className="bg-[#1f1f1f] h-full  rounded-lg">
          <div>
            {texts &&
              texts.map((m, i) => (
                <div className="p-4 relative" key={i}>
                  <button className="bg-[#333333] absolute bottom-1 p-1 px-2 rounded-full left-6 text-xs cursor-default">
                    {m.time.date + " " + m.time.time}
                  </button>
                  <button
                    className="bg-[#333333] absolute bottom-1 p-1 px-2 rounded-full right-6 text-xs cursor-default"
                    onClick={() => deletChat(i)}
                  >
                    delet
                  </button>
                  <p className="border-dashed border-2 border-[#535353] p-2 px-3 pb-4 rounded-lg">
                    {m.chat}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <textarea
          className="bg-[#1f1f1f] p-5 rounded-xl"
          ref={inputRef}
          rows="7"
        ></textarea>
        <button
          className="absolute right-5 m-3 bg-[#333333] p-2 px-4 rounded-full"
          onClick={() => {
            if (texts == null) {
              setChats([]);
            } else {
              setChats(JSON.parse(localStorage.getItem(param.id)));
            }
            let time = getCurrentDateTime();

            if (inputRef.current.value.trim() != "") {
              addChat({ chat: inputRef.current.value, time });
            }

            inputRef.current.value = "";
          }}
        >
          text
        </button>
      </div>
    </div>
  );
};

export default Chats;
