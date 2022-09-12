import dayjs from "dayjs";
import { useContext } from "react";
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
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  function removeTransaction() {
    if (window.confirm("Quer mesmo apagar essa transação?")) {
      deleteTransaction(id, user.token)
        .then(() => {
          console.log("deletado!");
          setRefresh(!refresh);
        })
        .catch((err) => {
          alert("Houve um erro ao tentar apagar a transação");
          console.log(err);
        });
    }
  }

  return (
    <TransactionWrapper type={type}>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
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
        <p>{value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        <div onClick={removeTransaction}>x</div>
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
