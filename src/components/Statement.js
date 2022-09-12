import styled from "styled-components";
import { LoggedTitle } from "../common/LoggedTitle";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Exit from "../img/exit.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { getTransactions } from "../services/mywallet";
import { useState } from "react";
import UserTransaction from "./UserTransaction";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(UserContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    getTransactions(user.token)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        alert(
          "Ocorreu um erro ao carregar suas transações.\nTente novamente mais tarde."
        );
      });
  }, [setTransactions, user.token, refresh]);

  let balance = 0;
  transactions.forEach((value) => {
    if (value.type === "payment") {
      balance = balance - value.value;
    } else {
      balance = balance + value.value;
    }
  });

  return (
    <main>
      <LoggedTitle>
        <h1>{`${t("hello")} ${user.name}`}</h1>
        <img
          src={Exit}
          alt=""
          onClick={() => {
            if (window.confirm(t("logout"))) {
              localStorage.removeItem("user");
              navigate("/");
            }
          }}
        />
      </LoggedTitle>
      <StatementSection transactions={transactions.length}>
        <TransactionsWrapper>
          {transactions.length ? (
            transactions.map((value) => (
              <>
                <UserTransaction
                  key={value.id}
                  id={value.id}
                  type={value.type}
                  description={value.description}
                  value={value.value}
                  date={value.date}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </>
            ))
          ) : (
            <NoTransactions>{t("noTransactions")}</NoTransactions>
          )}
        </TransactionsWrapper>
        {transactions.length && (
          <Balance balance={balance}>
            <p>SALDO</p>
            <p>
              {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </Balance>
        )}
      </StatementSection>
      <NewTransactions>
        <Link to="/new-receipt">
          <button>
            <IoAddCircleOutline />
            <p>{t("newReceipt")}</p>
          </button>
        </Link>
        <Link to="/new-payment">
          <button>
            <IoRemoveCircleOutline />
            <p>{t("newPayment")}</p>
          </button>
        </Link>
      </NewTransactions>
    </main>
  );
}

const StatementSection = styled.section`
  margin-top: 22px;
  margin-bottom: 13px;
  height: calc(100vh - 221px);
  max-height: calc(100vh - 221px);
  overflow-y: scroll;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.transactions ? "space-between" : "center"};
  padding: 23px 11px 11px 12px;
`;

const TransactionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 22px;
`;

const NewTransactions = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 155px;
    height: 114px;
    background-color: #a328d6;
    border-radius: 5px;
    border: 0px;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    color: #ffffff;
  }
  svg {
    font-size: 26px;
  }
  p {
    width: 65px;
    text-align: justify;
  }
`;

const NoTransactions = styled.h2`
  font-size: 20px;
  color: #868686;
  width: 180px;
  text-align: center;
`;

const Balance = styled.div`
  width: 100%;
  padding-left: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  p:first-child {
    font-weight: 700;
  }
  p:nth-child(2) {
    color: ${(props) => (props.balance >= 0 ? "#03AC00" : "#C70000")};
  }
`;
