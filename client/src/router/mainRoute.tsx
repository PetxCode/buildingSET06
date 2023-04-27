import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Block/Layout";
import Signin from "../pages/Signin";
import GameHome from "../pages/GameHome";
import CreateGame from "../pages/CreateGame";

export const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <GameHome />,
      },
      {
        index: true,
        element: <Signin />,
        path: "sign-in",
      },
      {
        index: true,
        element: <CreateGame />,
        path: "create-game",
      },
    ],
  },
]);
