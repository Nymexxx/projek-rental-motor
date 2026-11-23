import {
  createBrowserRouter,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { HomeScreen } from "./components/HomeScreen";
import { DetailScreen } from "./components/DetailScreen";
import { BookingScreen } from "./components/BookingScreen";
import { OrdersScreen } from "./components/OrdersScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { BottomNav } from "./components/BottomNav";

function isAuthenticated() {
  return !!localStorage.getItem("moto_auth");
}

function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const BOTTOM_NAV_PATHS = ["/", "/explore", "/orders", "/profile"];

function AppShell() {
  const location = useLocation();
  const showNav = BOTTOM_NAV_PATHS.includes(location.pathname);

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <div className={`flex-1 overflow-hidden ${showNav ? "pb-[65px]" : ""}`}>
        <Outlet />
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <HomeScreen />
          </RequireAuth>
        ),
      },
      {
        path: "explore",
        element: (
          <RequireAuth>
            <ExploreScreen />
          </RequireAuth>
        ),
      },
      {
        path: "detail/:id",
        element: (
          <RequireAuth>
            <DetailScreen />
          </RequireAuth>
        ),
      },
      {
        path: "booking/:id",
        element: (
          <RequireAuth>
            <BookingScreen />
          </RequireAuth>
        ),
      },
      {
        path: "orders",
        element: (
          <RequireAuth>
            <OrdersScreen />
          </RequireAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfileScreen />
          </RequireAuth>
        ),
      },
    ],
  },
]);