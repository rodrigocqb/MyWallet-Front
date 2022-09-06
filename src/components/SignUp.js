import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { LanguageSelect } from "./LanguageSelect";
import { Span, Title } from "./Login";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    navigate("/login");
  }

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form onSubmit={handleSubmit}>
        <input
          placeholder={t("name")}
          type="text"
          name="name"
          onChange={(e) =>
            handleForm({
              value: e.target.value,
              name: e.target.name,
            })
          }
          required
        />
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
        <input
          placeholder={t("confirmPassword")}
          type="password"
          name="confirmPassword"
          onChange={(e) =>
            handleForm({
              value: e.target.value,
              name: e.target.name,
            })
          }
          required
        />
        <button type="submit">{t("signUp")}</button>
      </Form>
      <Link to="/">
        <Span>{t("login")}</Span>
      </Link>
    </main>
  );
}
