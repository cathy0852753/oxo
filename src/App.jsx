import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import CardPage from "./pages/Card";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardPage />} />
        <Route path="/user" element={<Users />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
