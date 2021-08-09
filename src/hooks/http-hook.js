import { useCallback, useReducer } from "react";

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data: null, extra: null };
    case "RESPONSE":
      return {
        ...httpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { ...httpState, error: action.errorData };
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
    extra: null,
  });

  const sendRequest = useCallback((url, method, body, reqExtra) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method,
      body: body,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({
          type: "RESPONSE",
          responseData: responseData,
          extra: reqExtra,
        });
      })
      .catch((error) => {
        dispatchHttp({ action: "ERROR", errorData: error.message });
        console.log(error);
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    extra: httpState.extra,
    sendRequest,
    clearError,
  };
};

export default useHttp;
