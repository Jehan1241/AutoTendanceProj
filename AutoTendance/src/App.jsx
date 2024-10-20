import LoginBox from "./LoginBox/LoginBox";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoggedIn from "./LoggedIn/LoggedIn";

function App() {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/memberzz");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <div className="flex overflow-y-auto flex-col w-screen h-screen dark:text-white dark:bg-[rgb(15,15,15)]">
        <NavBar />
        <Routes>
          <Route element={<LoginBox />} path="/" />
          <Route element={<LoggedIn />} path="/LoggedIn" />
        </Routes>
      </div>
    </>
  );
}

export default App;
