export const BASE_URL = "http://localhost:3000";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("THis is dumb " + err);
    });
};

export const authorize = (email, password) => {
  console.log("This is happening, authorize");
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.message) {
        console.log("this is tha message " + data.message);
        return;
      }
      console.log("authorize worked");
      localStorage.setItem("token", data.token);
      return;
    });
};

export const checkToken = (token) => {
  console.log("Running Check Token in the utils folder");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token=${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);
};
