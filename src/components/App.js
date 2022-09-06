import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Statement from "./Statement";
import Transaction from "./Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/new-transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
