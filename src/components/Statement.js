import styled from "styled-components";
import { LoggedTitle } from "../common/LoggedTitle";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Exit from "../img/exit.svg";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function Statement() {
  const transactions = [];
  return (
    <main>
      <LoggedTitle>
        <h1>{`${t("hello")} fulano`}</h1>
        <img src={Exit} alt="" />
      </LoggedTitle>
      <StatementSection transactions={transactions.length}>
        {transactions.length ? (
          transactions.map(() => <></>)
        ) : (
          <NoTransactions>{t("noTransactions")}</NoTransactions>
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
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.transactions ? "space-between" : "center"};
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
