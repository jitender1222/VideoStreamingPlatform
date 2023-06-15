import store from "../Reducer/store";

import axios from "axios";

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = axios.post(
      "/api/v1/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {}
};
