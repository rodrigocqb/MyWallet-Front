import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function useLocal() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
      navigate("/statement");
    }
  }, [navigate, setUser]);
}

export { useLocal };
