import React,{useState} from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Groups from "./components/Groups";
import Chats from "./components/Chats";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";

const App = () => {

  // let store = JSON.parse(localStorage.getItem("store")) || []
  const appRouter = createBrowserRouter([
    {
      path: "/:id",
      element: <><Groups  /><Chats/></>
    },
    {
      path: "/",
      element: <><Groups  /><Error/></>
    }
  ])

  return (
    <>
      <div className="flex ">
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
