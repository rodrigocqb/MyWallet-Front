import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../style/globalStyle";
import Login from "./Login";
import PrivatePage from "./PrivatePage";
import SignUp from "./SignUp";
import Statement from "./Statement";
import Transaction from "./Transaction";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/statement"
            element={
              <PrivatePage>
                <Statement />
              </PrivatePage>
            }
          />
          <Route
            path="/new-payment"
            element={
              <PrivatePage>
                <Transaction />
              </PrivatePage>
            }
          />
          <Route
            path="/new-receipt"
            element={
              <PrivatePage>
                <Transaction />
              </PrivatePage>
            }
          />
          <Route
            path="/edit-payment"
            element={
              <PrivatePage>
                <Transaction />
              </PrivatePage>
            }
          />
          <Route
            path="/edit-receipt"
            element={
              <PrivatePage>
                <Transaction />
              </PrivatePage>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
