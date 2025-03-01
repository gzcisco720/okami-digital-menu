import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import { AdminContainer } from "../../pages/AdminMenuList/styles";
import { AdminNavigation } from "../../components/AdminNavigation";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { verify } = useAuthStore();
  
  useEffect(() => {
    verify().then((authUser) => {
      if (!authUser) {
        navigate("/signin");
      }
    });
  }, [navigate, verify]);

  return (
    <>
      <AdminNavigation />
      <AdminContainer maxWidth="xl">
        <Outlet />
      </AdminContainer>
    </> 
  );
};