import { showNotification } from "../components/common/Notification";
import api from "./api";

const hasBody = (method) => !["GET", "DELETE"].includes(method.toUpperCase());
const isForm = (val) => typeof FormData !== "undefined" && val instanceof FormData;

const normalizeParams = (obj = {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && !(typeof v === "string" && v.trim() === "")
    )
  );

const apiRequest = async ({
  method = "GET",
  endpoint = "",
  data = {},
  params = {},
  setIsLoading,
  setData,
  onSuccess = () => {},
  onError = () => {},
  showMsg = false,
  headers: customHeaders = {},
  signal,
  timeout,
}) => {
  if (setIsLoading) setIsLoading(true);

  const upperMethod = method.toUpperCase();
  const form = isForm(data);
  const reqHasBody = hasBody(upperMethod);

  const headers = {
    Accept: "application/json",
    ...(reqHasBody && !form ? { "Content-Type": "application/json" } : {}),
    ...customHeaders,
  };

  try {
    const config = {
      method: upperMethod,
      url: endpoint,
      headers,
      params: normalizeParams(params),
      signal,
      timeout,
    };

    if (reqHasBody) {
      config.data = form ? data : data && typeof data === "object" ? JSON.stringify(data) : data;
    }

    const response = await api(config);

    if (setData) setData(response.data);
    await Promise.resolve(onSuccess(response.data));

    if (showMsg) {
      showNotification({
        type: upperMethod === "DELETE" ? "success" : "success",
        message:
          response.data?.message || response.data?.msg || "Request successful",
      });
    }

    return response.data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";
    if (error?.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data?.msg ||
        error.response.statusText ||
        errorMessage;
    } else if (error?.request) {
      errorMessage = "Network error. Please check your internet connection.";
    } else if (error?.message) {
      errorMessage = error.message;
    }

    await Promise.resolve(onError(error));
    if (showMsg) showNotification({ type: "error", message: errorMessage });

    throw error;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

const createApiRequest =
  (method, endpoint) =>
  (args = {}) => {
    const {
      data = {},
      params = {},
      setIsLoading,
      setData,
      onSuccess = () => {},
      onError = () => {},
      showMsg = false,
      headers,
      signal,
      timeout,
      ...rest
    } = args;

    const finalEndpoint =
      typeof endpoint === "function" ? endpoint({ ...args, ...rest }) : endpoint;

    return apiRequest({
      method: method.toUpperCase(),
      endpoint: finalEndpoint,
      data,
      params,
      setIsLoading,
      setData,
      onSuccess,
      onError,
      showMsg,
      headers,
      signal,
      timeout,
    });
  };

export { apiRequest, createApiRequest };
export default apiRequest;
