import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { LoggedTitle } from "../common/LoggedTitle";
import UserContext from "../contexts/UserContext";
import { postTransaction, updateTransaction } from "../services/mywallet";

export default function Transaction() {
  const [form, setForm] = useState({ value: 0, description: "" });
  const [disabled, setDisabled] = useState(false);

  const location = useLocation().pathname;

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const state = useLocation().state;
  const id = state?.id;
  useEffect(() => {
    if (location === "/edit-receipt" || location === "/edit-payment") {
      const value = state?.value;
      const description = state?.description;
      setForm({ value, description });
    }
  }, [location, state?.description, state?.value]);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    let type;
    if (location === "/new-receipt" || location === "/edit-receipt") {
      type = "receipt";
    } else {
      type = "payment";
    }
    const value = Number(form.value);
    if (location === "/new-receipt" || location === "/new-payment") {
      postTransaction({ ...form, value, type }, user.token)
        .then((res) => {
          navigate("/statement");
        })
        .catch((err) => {
          alert("Houve um erro ao salvar sua transação");
          console.log(err);
          setDisabled(false);
        });
    } else {
      updateTransaction(id, { ...form, value, type }, user.token)
        .then((res) => {
          navigate("/statement");
        })
        .catch((err) => {
          alert("Houve um erro ao salvar sua transação");
          console.log(err);
          setDisabled(false);
        });
    }
  }

  if (location === "/new-payment" || location === "/new-receipt") {
    return (
      <main>
        <LoggedTitle transaction={true}>
          {location === "/new-receipt" ? t("newReceipt") : t("newPayment")}
        </LoggedTitle>
        <Form onSubmit={handleSubmit} disabled={disabled}>
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
            disabled={disabled}
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
              <p>
                {location === "/new-receipt"
                  ? t("saveReceipt")
                  : t("savePayment")}
              </p>
            )}
          </button>
        </Form>
      </main>
    );
  } else {
    return (
      <main>
        <LoggedTitle transaction={true}>
          {location === "/edit-receipt" ? t("editReceipt") : t("editPayment")}
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
            value={form.value}
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
            value={form.description}
            required
          />
          <button type="submit">
            {location === "/edit-receipt"
              ? t("updateReceipt")
              : t("updatePayment")}
          </button>
        </Form>
      </main>
    );
  }
}
