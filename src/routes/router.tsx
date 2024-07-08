import Layout from "../components/layout";
import ProtectedRoute from "../components/protected-route";
import CreateAccount from "./create-account";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";

export const RouterInfo = [
    {
      path:"/",
      element: (
        <ProtectedRoute>
            <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Home/>,
        },
        {
          path: "profile",
          element: <Profile />
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/create-account",
      element: <CreateAccount/>,
    },
  ]