import Register from "../user/register";
import ActivateAccount from "../user/activateAccount";
import Login from "../user/login";
import ResetPassword from "../user/resetPassword";
import SendResetPasswordEmail from "../user/sendResetPasswordEmail";
import Home from "../pages/home";
import Settings from "../user/account/settings";
import ProductList from "../pages/products/list";
import ProductDetails from "../pages/productDetails";
import ViewProduct from "../pages/products/list/preview";
import About from "../pages/about";
import Contact from "../pages/contact";
import Payment from "../pages/payment";
import Faq from "../pages/faq";
import Categories from "../pages/categories";
import Orders from "../user/account/order/list";
import Transaction from "../user/account/transaction/list";
import Cart from "../pages/cart";
import CheckoutMessage from "../pages/checkout/Message";
import OrdersDetails from "../pages/orderDetails";
import UploadArtwork from "../pages/products/list/preview/UploadArtwork";
import QuotationDetails from "../pages/home/quote/details";

const routes = [
  { path: "/account", component: <Orders /> },
  { path: "/account/orders/:id", component: <OrdersDetails /> },
  { path: "/transactions", component: <Transaction /> },
  { path: "/settings", component: <Settings /> },
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
  { path: "/products/:id", component: <ProductDetails /> },
  { path: "/products/list", component: <ProductList /> },
  { path: "/products/list/:id", component: <ViewProduct /> },
  { path: "/products/:category", component: <Categories /> },
  { path: "/faq", component: <Faq /> },
  { path: "/cart", component: <Cart /> },
  { path: "/payment-success", component: <CheckoutMessage /> },
  { path: "/upload-artwork", component: <UploadArtwork /> },
  { path: "/quotation/form", component: <QuotationDetails /> },
];

export { routes, publicRoutes };
