import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Chat from "./pages/chat";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
