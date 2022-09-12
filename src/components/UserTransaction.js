import dayjs from "dayjs";
import { useContext, useState } from "react";
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

  function removeTransaction() {
    if (window.confirm("Quer mesmo apagar essa transação?")) {
      setLoader(true);
      deleteTransaction(id, user.token)
        .then(() => {
          console.log("deletado!");
          setRefresh(!refresh);
        })
        .catch((err) => {
          alert("Houve um erro ao tentar apagar a transação");
          console.log(err);
          setLoader(false);
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
