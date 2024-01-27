import { useNavigate } from "react-router-dom";
import { authApi } from "../store/services/AuthService";
import { useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const { error } = authApi.useRefreshQuery();
  useEffect(() => {
    if (error) {
      navigate("/unauth");
    }
  }, [error, navigate]);
};
