import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:5000");
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);
  const topButtonStyles =
    "border-2 px-10 my-5 hover:bg-pink-950 duration-1000 cursor-pointer rounded-2xl hover:text-white";
  return (
    <>
      {/* <div className="flex h-svh bg-linear-to-r from-[#230a30] to-[#29081d] md:px-5  md:py-5 flex-col w-full ">
        <div className="bg-black flex-1 rounded-t-2xl "></div>
        <div className="bg-amber-100  flex flex-12 rounded-b-2xl">
          <div className="flex-6 flex bg-purple-100 rounded-b-2xl flex-wrap flex-shrink-0 ">
            <div className="w-full  md:flex-2 flex flex-col gap-5 px-5 py-5 bg-green-50 rounded-b-2xl">
              <div className=" h-[50%] bg-amber-400 rounded-2xl border-2 border-amber-200"></div>
              <div className="h-[50%] flex items-center justify-center bg-amber-400 rounded-2xl flex flex-col relative ">
                {" "}
                <button className="ml-4 mt-4 absolute top-0 left-0 hover:bg-gray-300 duration-700 cursor-pointer px-3 rounded-lg bg-white">
                  Disable webCam
                </button>
                <button className="mr-4 mt-4 absolute top-0 right-0 hover:bg-gray-300 duration-700 cursor-pointer px-3 rounded-lg bg-white">
                  Next Photo
                </button>
                <button className=" mb-4 mr-4 absolute bottom-0 right-0 hover:bg-gray-300 duration-700 cursor-pointer px-3 rounded-lg bg-white">
                  Mute Mic
                </button>
                <div className="h-full">
                  <img
                    className="object-fill h-full   "
                    src="https://www.modelfactory.in/assets/frontend/images/homeabout1.jpeg"
                  ></img>
                </div>
              </div>
            </div>
            <div className="flex-4 flex flex-col bg-purple-100 py-5 px-5">
              <div className="bg-amber-300 rounded-t-2xl  flex-2 flex justify-between gap-5 px-10">
                <div className="flex gap-5">
                  {" "}
                  <button className={topButtonStyles}>Next</button>
                  <button className={topButtonStyles}>Add as Friend</button>
                  <button className={topButtonStyles}>Stop</button>
                </div>
                <div className="flex gap-5">
                  <button className={topButtonStyles}>Report & next</button>
                </div>
              </div>
              <div className="bg-white text-purple-950  flex-15 px-5 py-5">
                <div className="">
                  <p>
                    Bio : Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, bu
                  </p>
                  <p>Location : United States</p>
                  <p>Interests : funny , jokes, music , cricket </p>
                </div>
                <div></div>
              </div>
              <div className="bg-amber-300 rounded-b-2xl gap-5 flex-2 flex px-5 py-2 bg">
                <input
                  className="flex-8 bg-white rounded-2xl my-2 px-5"
                  type="text"
                  placeholder="Enter Your Message"
                ></input>
                <button className="flex-2 font-semibold cursor-pointer  rounded-2xl bg-white my-2">
                  Send
                </button>
              </div>{" "}
            </div>
          </div>
          <div className="flex-2 flex flex-col px-5 py-5 gap-5 bg-amber-200">
            <div className="flex-4  px-4 py-5 bg-pink-200"></div>
            <div className="flex-10 bg-white"></div>
          </div>
        </div>
      </div> */}
      <div style={{ padding: 20 }}>
        <h2>Socket.io Chat</h2>

        <input
          type="text"
          value={message}
          placeholder="Type message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>

        <div>
          {messageList.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
