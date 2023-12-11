import { fetchDataSuccess } from "@/redux/slices/mySlices/roles";
import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MainLayout = ({ router, user, mutate, children }: any) => {
  const dispatch = useDispatch();

  const layoutRoutes = [
    "pages",
    "clients",
    "configurations",
    "create-production",
    "dashboard",
    "productions",
    "sandbox",
    "settings",
    "production",
    "singlesignon",
    "transactions",
    "my-profile",
    "edit-production",
    "payroll",
    "reports"
    // "/forgot-password",
    // "/login",
    // "/reset-password",
    // "/welcome"
  ];

  const isProtectedRoute = (route: string) => {
    const parentRoute = route.split("/")[1] || "";
    if (layoutRoutes.includes(parentRoute)) return true;
    else return false;
  };

  useEffect(() => {
    if (user) dispatch(fetchDataSuccess(user));
  }, [user]);

  if (isProtectedRoute(router.pathname))
    return (
      <div className="d-flex">
        <Sidebar
          props={{
            name: user?.name,
            profileImg: user?.profileImg,
            mutate,
          }}
        />

        <div className="px-4 main-card">{children}</div>
      </div>
    );
  else return <>{children}</>;
};

export default MainLayout;
