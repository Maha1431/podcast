"use client";

import { useAuth } from "../contexts/userAuth";
import { useEffect } from "react";

function CheckAuth({ children }) {
  const { user, checkAuth } = useAuth();
  useEffect(() => {
    async function checkAuthHelper() {
      const res = await checkAuth();
      return res;
    }
    if (user._id === "") {
      const res = checkAuthHelper();
    }
  }, []);
  return <div>{children}</div>;
}

export default CheckAuth;
