import axios from "axios";

const url = "http://localhost:5000";

function postLogin(body) {
  const promise = axios.post(`${url}/sign-in`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${url}/sign-up`, body);
  return promise;
}

function postTransaction(body, token) {
  const promise = axios.post(`${url}/transactions`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return promise;
}

function getTransactions(token) {
  const promise = axios.get(`${url}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return promise;
}

export { postLogin, postSignUp, postTransaction, getTransactions };
