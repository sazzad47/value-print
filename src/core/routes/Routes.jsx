import Register from "../user/register";
import ActivateAccount from "../user/activateAccount";
import Login from "../user/login";
import ResetPassword from "../user/resetPassword";
import SendResetPasswordEmail from "../user/sendResetPasswordEmail";
import Home from "../pages/home";
import Settings from "../user/account/settings";
import Categories from "../pages/products/categories";
import ProductList from "../pages/products/list";
import ViewProduct from "../pages/products/list/preview";
import About from "../pages/about";
import Contact from "../pages/contact";
import Payment from "../pages/payment";
import Faq from "../pages/faq";
import ProductsByCategory from "../pages/productByCategory";
import Orders from "../user/account/order/list";
import Transaction from "../user/account/transaction/list";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";

const routes = [
 
  { path: "/account", component: <Orders /> },
  { path: "/transactions", component: <Transaction /> },
  { path: "/settings", component: <Settings /> },
  { path: "/checkout", component: <Checkout /> },
];

const publicRoutes = [
  { path: "/register", component: <Register /> },
  { path: "/activate-account", component: <ActivateAccount /> },
  { path: "/login", component: <Login /> },
  { path: "/reset-password/:id/:token", component: <ResetPassword /> },
  { path: "/reset-password-email", component: <SendResetPasswordEmail /> },
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/contact", component: <Contact /> },
  { path: "/payment", component: <Payment /> },
  { path: "/products/categories", component: <Categories /> },
  { path: "/products/list", component: <ProductList /> },
  { path: "/products/list/:id", component: <ViewProduct /> },
  { path: "/products/list/:category", component: <ProductsByCategory /> },
  { path: "/faq", component: <Faq /> },
  { path: "/cart", component: <Cart /> },
];

export { routes, publicRoutes };
