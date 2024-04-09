import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Header from "./Components/Header";
import Signin from "./Pages/Signin";
import FooterComp from "./Components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/sign-up"} element={<Signup />} />
          <Route path={"/sign-in"} element={<Signin />} />
          <Route path={"/projects"} element={<Projects />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
}

export default App;
