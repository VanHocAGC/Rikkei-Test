import axios, { AxiosRequestConfig } from "axios";
import { TOKEN } from "constants/index";
import Cookies from "js-cookie";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
export const axiosRequest = async (
  config: AxiosRequestConfig,
  unauthorized?: boolean,
) => {
  const axiosConfig: AxiosRequestConfig = {
    ...config,
    baseURL: BACKEND_URL,
  };

  if (!unauthorized && Cookies.get(TOKEN)) {
    axiosConfig.headers = {
      Authorization: `Bearer ${Cookies.get(TOKEN)}`,
    };
  }

  const response = await axios(axiosConfig);
  return response.data;
};
