import mainURL from "./settings";

const URL = mainURL;

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {

  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }

  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }

  const setUsername = (user) => {
      localStorage.setItem('userName', user)
    }

  const getUsername = () => {
    return localStorage.getItem('userName')
  }

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
  }

  const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        console.log(res);
        setToken(res.token);
        setUsername(res.username);
      })
  }

  const fetchUserData = async () => {
    const options = makeOptions("GET", true); //True add's the token
    const res = await fetch(URL + "/api/user/user", options);
    return handleHttpErrors(res);
  }

  const fetchAdminData = async () => {
    const options = makeOptions("GET", true); //True add's the token
    const res = await fetch(URL + "/api/user/admin", options);
    return handleHttpErrors(res);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  return {
    getUsername,
    handleHttpErrors,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserData,
    fetchAdminData
  }
}
const facade = apiFacade();
export default facade;