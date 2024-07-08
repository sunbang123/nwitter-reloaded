import Layout from "../components/layout";
import CreateAccount from "./create-account";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";

export const RouterInfo = [
    {
      path:"/",
      element: <Layout/>,
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