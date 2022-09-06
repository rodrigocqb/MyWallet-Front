import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../common/Form";
import { LanguageSelect } from "./LanguageSelect";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const { t } = useTranslation();

  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    navigate("/statement");
  }

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form onSubmit={handleSubmit}>
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
          required
        />
        <button type="submit">{t("enter")}</button>
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
