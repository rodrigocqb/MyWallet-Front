import dayjs from "dayjs";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { deleteTransaction } from "../services/mywallet";

export default function UserTransaction({
  id,
  type,
  description,
  value,
  date,
  refresh,
  setRefresh,
}) {
  const [loader, setLoader] = useState(false);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  function removeTransaction() {
    if (window.confirm(t("deleteTransaction"))) {
      setLoader(true);
      deleteTransaction(id, user.token)
        .then(() => {
          setRefresh(!refresh);
        })
        .catch((err) => {
          alert(t("deleteTransactionError"));
          console.log(err);
          setLoader(false);
        });
    }
  }

  return (
    <TransactionWrapper type={type}>
      <div>
        <span>
          {i18n.resolvedLanguage === "pt-BR"
            ? dayjs(date).format("DD/MM")
            : dayjs(date).format("MM/DD")}
        </span>
        <h2
          onClick={() => {
            if (type === "receipt") {
              navigate("/edit-receipt", { state: { id, value, description } });
            } else {
              navigate("/edit-payment", { state: { id, value, description } });
            }
          }}
        >
          {description}
        </h2>
      </div>
      <div>
        <p>
          {i18n.resolvedLanguage === "pt-BR"
            ? value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
            : value.toFixed(2)}
        </p>
        {!loader ? (
          <div onClick={removeTransaction}>x</div>
        ) : (
          <Oval
            height="12"
            width="12"
            color="#c6c6c6"
            ariaLabel="three-dots-loading"
          />
        )}
      </div>
    </TransactionWrapper>
  );
}

const TransactionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    color: ${(props) => (props.type === "receipt" ? "#03AC00" : "#C70000")};
  }
  div {
    display: flex;
  }
  span {
    margin-right: 6px;
    color: #c6c6c6;
  }
  div > div {
    color: #c6c6c6;
    margin-left: 11px;
  }
`;
