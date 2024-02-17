import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Login from "./pages/Login";
import PrivateRoutes from "./pages/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
