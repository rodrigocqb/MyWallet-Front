import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../common/Form";
import UserContext from "../contexts/UserContext";
import { useLocal } from "../hooks/useLocal";
import { postLogin } from "../services/mywallet";
import { LanguageSelect } from "./LanguageSelect";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(false);

  useLocal();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    postLogin(form)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/statement");
      })
      .catch((err) => {
        console.log(err);
        alert(t("loginError"));
        setDisabled(false);
      });
  }

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form onSubmit={handleSubmit} disabled={disabled}>
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={(e) =>
            handleForm({
              value: e.target.value,
              name: e.target.name,
            })
          }
          disabled={disabled}
          required
        />
        <input
          placeholder={t("password")}
          type="password"
          name="password"
          onChange={(e) =>
            handleForm({
              value: e.target.value,
              name: e.target.name,
            })
          }
          disabled={disabled}
          required
        />
        <button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots
              height="13"
              width="51"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
            />
          ) : (
            <p>{t("enter")}</p>
          )}
        </button>
      </Form>
      <Link to="/sign-up">
        <Span>{t("signUpLink")}</Span>
      </Link>
    </main>
  );
}

export const Title = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: #ffffff;
  margin-top: 25vh;
`;

export const Span = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;
