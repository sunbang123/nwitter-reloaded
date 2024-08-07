import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import { RouterInfo } from "./routes/router";

const router = createBrowserRouter(RouterInfo)

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body {
    background-color: #D0B047;
    color: Black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
  <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </Wrapper>
  );
}

export default App
