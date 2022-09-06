import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Form } from "../common/Form";
import { LanguageSelect } from "./LanguageSelect";
import { Span, Title } from "./Login";

export default function SignUp() {
  const { t } = useTranslation();

  return (
    <main>
      <Title>MyWallet</Title>
      <LanguageSelect />
      <Form>
        <input placeholder={t("name")} type="text" name="name" required />
        <input placeholder="E-mail" type="email" name="email" required />
        <input
          placeholder={t("password")}
          type="password"
          name="password"
          required
        />
        <input
          placeholder={t("confirmPassword")}
          type="password"
          name="password"
          required
        />
        <button>{t("signUp")}</button>
      </Form>
      <Link to="/">
        <Span>{t("login")}</Span>
      </Link>
    </main>
  );
}
