import { Middleware } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

interface MiddlewareProps {
  type: string;
  payload: any;
}
const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action: MiddlewareProps) => {
    if (action.type !== "api/apiRequestBegan") return next(action);
    else {
      next(action);

      const {
        baseURL = URL,
        url,
        method,
        data,
        onSuccess,
        onError,
        callback,
        errorCallback,

        showLoader = true,
      } = action.payload;

      try {
        // if (showLoader) {
        message.loading({
          content: " ",
          duration: 0,
          key: "loading_msg",
        });
        // }

        const response = await axios.request({
          baseURL,
          url,
          method,
          data,
        });

        // if (showLoader) {
        message.destroy("loading_msg");
        // }

        if (callback) callback(response.data);
        showLoader &&
          dispatch({
            type: "api/apiRequestSuccess",
            payload: "Request Successful!!",
          });

        if (onSuccess) {
          dispatch({ type: onSuccess, payload: response.data });
        }
      } catch (error: any) {
        console.log(error);
        message.destroy("loading_msg");

        if (onSuccess === "product/setOrderedItems") {
          if (errorCallback) errorCallback();
        }

        message.error(
          error.response ? error.response.data.message : "Internal error"
        );

        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
