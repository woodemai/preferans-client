import { authApi } from "../store/services/AuthService";

export const useAuth = () => {
  authApi.useRefreshQuery();
};
