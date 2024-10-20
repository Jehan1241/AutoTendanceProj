import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CiCircleAlert } from "react-icons/ci";

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const loginClickHandler = async () => {
    const userId = await sendCredentials();
    if (userId) {
      navigate("LoggedIn", { state: { userId } });
    } else {
      setLoginFailed(true);
    }
  };

  const sendCredentials = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/login?username=${username}&password=${password}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result.message === "Login successful") {
        return result.user_id;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error during fetch:", error);
      return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-[rgb(15,15,15)]">
      <div className="flex flex-col gap-8 items-center p-8 w-full max-w-md bg-white rounded-xl border border-black shadow-lg dark:bg-[rgb(10,10,10)] dark:border-[rgb(70,70,70)]">
        <h1 className="text-xl font-semibold dark:text-white">Login</h1>
        <div className="flex flex-col w-full">
          <label className="text-black dark:text-white">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mt-1 rounded-md border border-black dark:bg-[rgb(10,10,10)] dark:text-white dark:border-[rgb(70,70,70)] focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-black dark:text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mt-1 rounded-md border border-black dark:bg-[rgb(10,10,10)] dark:text-white dark:border-[rgb(70,70,70)] focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            placeholder="Enter your password"
          />
        </div>
        {loginFailed && (
          <div className="mt-2 text-red-400">
            <CiCircleAlert className="inline" size={30} /> Invalid Username or
            Password
          </div>
        )}
        <Button
          onClick={loginClickHandler}
          className="mt-4 w-full h-10 text-white bg-black dark:bg-white dark:text-black"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginBox;
