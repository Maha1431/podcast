"use client";

import axios from "axios";

const { default: AxiosClient } = require("@/utils/axios");
const { createContext, useReducer, useContext } = require("react");

const UserAuthContext = createContext();

const initialState = {
  _id: "",
  name: "",
  email: "",
  projects: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      if (state._id !== "") return state;
      return { ...action.payload };

    case "updateUserName":
      return { ...state, name: action.payload };

    case "logout":
      return initialState;
  }
}

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const STORAGE_KEY = "__USER_ID__";

function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  async function login(email) {
    try {
      const res = await axios
        .post(`${BASE_URL}/user/login`, { email })
        .catch((error) => error.response);

      if (res.status === 200 || res.status === 201) {
        const user = res.data.user;
        localStorage.setItem(STORAGE_KEY, user._id);
        dispatch({ type: "login", payload: user });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function checkAuth() {
    try {
      const userId = localStorage.getItem(STORAGE_KEY);
      const res = await axios
        .post(`${BASE_URL}/user/checkAuth`, null, {
          headers: {
            Authorization: userId,
          },
        })
        .catch((error) => error.response);

      if (res.status === 200 || res.status === 201) {
        const user = res.data.user;
        localStorage.setItem(STORAGE_KEY, user._id);
        dispatch({ type: "login", payload: user });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserName(name) {
    try {
      const userId = localStorage.getItem(STORAGE_KEY);
      const res = await axios
        .post(
          `${BASE_URL}/user/`,
          { name },
          {
            headers: {
              Authorization: userId,
            },
          }
        )
        .catch((error) => error.response);

      if (res.status === 200 || res.status === 201) {
        const user = res.data.user;
        dispatch({ type: "updateUserName", payload: user.name });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "logout" });
  }

  return (
    <UserAuthContext.Provider
      value={{ user, login, checkAuth, logout, updateUserName }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined)
    throw new Error("UserAuthContext was used outside AuthProvider scope");

  return context;
}

export { AuthProvider, useAuth };
