import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { postSignUp } from "../services/mywallet";
import { LanguageSelect } from "./LanguageSelect";
import { Span, Title } from "./Login";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disabled, setDisabled] = useState(false);

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
    if (form.confirmPassword !== form.password) {
      return alert(t("differentPasswords"));
    }
    setDisabled(true);
    postSignUp(form)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(t("signUpError"));
        setDisabled(false);
      });
  }

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form onSubmit={handleSubmit} disabled={disabled}>
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
          disabled={disabled}
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
            <p>{t("signUp")}</p>
          )}
        </button>
      </Form>
      <Link to="/">
        <Span>{t("login")}</Span>
      </Link>
    </main>
  );
}
