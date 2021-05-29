export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.desireejoy.students.nomoreparties.site";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.status === 201 || res.status === 200) {
        return res.json();
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.message) {
        return;
      }
      localStorage.setItem("token", data.token);

      return;
    });
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token=${token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => data);
};
