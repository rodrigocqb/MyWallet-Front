import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Form } from "../common/Form";
import { LoggedTitle } from "../common/LoggedTitle";

export default function Transaction() {
  const [form, setForm] = useState({ value: 0, description: "" });

  const location = useLocation().pathname;

  const { t } = useTranslation();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
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
