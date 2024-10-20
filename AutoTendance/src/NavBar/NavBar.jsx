import ThemeToggle from "../ThemeToggle/ThemeToggle";

function NavBar() {
  return (
    <div className="flex flex-row justify-between p-3 mx-5 my-2 rounded-md border bg-black text-white border-black dark:bg-[rgb(10,10,10)] dark:border-[rgb(70,70,70)]">
      <h1 className="mx-3 font-sans text-xl font-bold">AutoTendance</h1>
      <ThemeToggle />
    </div>
  );
}

export default NavBar;
