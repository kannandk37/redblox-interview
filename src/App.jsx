import logo from "./logo.svg";
import "./App.css";
import List from "./components/list";
import CreateForm from "./components/createForm";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FallBack from "./utils";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to={"/list"} />} path="/"></Route>
          <Route element={<List />} path="/list"></Route>
          <Route element={<CreateForm />} path="/addComment"></Route>
          <Route element={<FallBack />} path="/fallback"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
