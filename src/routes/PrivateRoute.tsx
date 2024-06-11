import { useNavigate } from "react-router";
import { AuthData } from "../auth/AuthWrapper";
import { useEffect } from "react";
import { LoadingIndicator } from "../common";

export const PrivateRoute = ({ ...props }) => {
  const { isAuthenticated, pending } = AuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (pending) return;
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated, navigate, pending]);

  if (pending) return <LoadingIndicator />;

  if (!isAuthenticated) return <LoadingIndicator />;

  return props.children;
};
