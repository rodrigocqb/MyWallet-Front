import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../common/Form";
import { LanguageSelect } from "./LanguageSelect";

export default function Login() {
  const { t } = useTranslation();

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form>
        <input placeholder="E-mail" type="email" name="email" required />
        <input
          placeholder={t("password")}
          type="password"
          name="password"
          required
        />
        <button>{t("enter")}</button>
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
