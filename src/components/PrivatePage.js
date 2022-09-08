import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function PrivatePage({ children }) {
  const { user, setUser } = useContext(UserContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localUser) {
      alert(t("pleaseLogIn"));
      navigate("/");
    } else if (!user) {
      setUser(localUser);
    }
  }, [localUser, navigate, setUser, t, user]);

  if (!user) {
    return <></>;
  }

  return <>{children}</>;
}
