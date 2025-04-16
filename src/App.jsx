import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import CardPage from "./pages/Card";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user" element={<Users />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
