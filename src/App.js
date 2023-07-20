import { useEffect } from "react";
import ItAdmin from "./core";
import Toast from "./core/components/Toast";
import { useRefreshAccessToken } from "./core/user/refreshToken";

function App() {
  const { refreshAccessToken } = useRefreshAccessToken();
 
  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  
  return (
    <>
      <ItAdmin />
      <Toast />
    </>
  );
}

export default App;
