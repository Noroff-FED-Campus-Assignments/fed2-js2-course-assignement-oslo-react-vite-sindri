import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import "./App.scss";

function App() {
  return (
    <>
      <header>
        <div className="header-container">
          <Navbar />
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
