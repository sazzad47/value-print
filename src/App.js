import { useEffect } from "react";
import ItAdmin from "./core";
import Toast from "./core/components/Toast";
import { useRefreshAccessToken } from "./core/user/refreshToken";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./core/state/api/cart";

function App() {
  const dispatch = useDispatch();
  const { refreshAccessToken } = useRefreshAccessToken();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart"));
    if (existingCartItems && existingCartItems.length > 0) {
      existingCartItems.forEach((item) => {
        dispatch(addItem(item));
      });
    }

    // return () => {
    //   localStorage.removeItem("cart");
    // };
  }, [dispatch]);

  useEffect(() => {
    const cartItemsJSON = JSON.stringify(cartItems);
    localStorage.setItem("cart", cartItemsJSON);
  }, [cartItems]);

  return (
    <>
      <ItAdmin />
      <Toast />
    </>
  );
}

export default App;
