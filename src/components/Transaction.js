import { useContext } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { LoggedTitle } from "../common/LoggedTitle";
import UserContext from "../contexts/UserContext";
import { postTransaction } from "../services/mywallet";

export default function Transaction() {
  const [form, setForm] = useState({ value: 0, description: "" });

  const location = useLocation().pathname;

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let type;
    if (location === "/new-receipt") {
      type = "receipt";
    } else {
      type = "payment";
    }
    const value = Number(form.value);
    postTransaction({ ...form, value, type }, user.token)
      .then((res) => {
        navigate("/statement");
      })
      .catch((err) => {
        alert("Houve um erro ao salvar sua transação");
        console.log(err);
      });
  }

  if (location === "/new-payment" || location === "/new-receipt") {
    return (
      <main>
        <LoggedTitle transaction={true}>
          {location === "/new-receipt" ? t("newReceipt") : t("newPayment")}
        </LoggedTitle>
        <Form onSubmit={handleSubmit}>
          <input
            placeholder={t("value")}
            type="number"
            step="0.01"
            name="value"
            onChange={(e) =>
              handleForm({
                value: e.target.value,
                name: e.target.name,
              })
            }
            required
          />
          <input
            placeholder={t("description")}
            type="text"
            name="description"
            onChange={(e) =>
              handleForm({
                value: e.target.value,
                name: e.target.name,
              })
            }
            required
          />
          <button type="submit">
            {location === "/new-receipt" ? t("saveReceipt") : t("savePayment")}
          </button>
        </Form>
      </main>
    );
  } else {
    return <></>;
  }
}
