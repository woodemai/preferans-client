import { useNavigate } from "react-router-dom";
import { authApi } from "../store/services/AuthService";

export const useAuth = () => {
  const navigate = useNavigate();
  const { error } = authApi.useRefreshQuery();
  if (error) {
    navigate("/unauth");
  }
};
