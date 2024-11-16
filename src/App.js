import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
import QuoteResult from "./pages/getQuote/quoteResult";
import Header from "./components/Header/Header";
import AccountPage from "./pages/account";
import ContactUsPage from "./pages/contactUs";
import NotFoundPage from "./pages/ErrorPages/NotFound";
import ComingSoonPage from "./pages/ComingSoon/ComingSoon";
import ForgotPasswordPage from "./pages/forgotPassword";
import ForgotResetPassword from "./pages/forgotResetPassword";
import GetQuotePage from "./pages/getQuote";
import GetQuoteContainerPage from "./pages/getQuote/container";
// import GetQuoteFTLPage from "./pages/getQuote/ftl";
import GetQuoteLTLPage from "./pages/getQuote/ltl";
import LoginPage from "./pages/login";
import NewPasswordPage from "./pages/newPassword";
import UpdatedPasswordPage from "./pages/updatedPassword"
import RegisterPage from "./pages/register";
import ShipmentsPage from "./pages/shipments";
import ShipmentDetailsPage from "./pages/shipments/shipmentDetails";
import HomePage from "./pages/home";
import Privacy from "./pages/privacy";
import Terms from "./pages/term";
import Modal from "./components/Modal";
import LoggedInFooter from "./components/Footer/LoggedInFooter";
import BatchQuotePage from "./pages/batchQuote";
import { platformViewsActions } from "./store/platfromViews";
import MobileAccountPage from "./pages/account/mobileAccount";
import MobileUsersPage from "./pages/account/mobileUsers";
import HomePageHeader from "./components/Header/HomePageHeader";
import HomePageFooter from "./components/Footer/HomePageFooter";

function App() {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const dispatcher = useDispatch();
  const mobileWidthOffset = 800;

  useEffect(() => {
    // writing some logic for resizing the window

    if (window.innerWidth < mobileWidthOffset) {
      dispatcher(
        platformViewsActions.setRenderViewType({ viewType: "mobile" })
      );
    } else {
      dispatcher(
        platformViewsActions.setRenderViewType({ viewType: "desktop" })
      );
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < mobileWidthOffset) {
        dispatcher(
          platformViewsActions.setRenderViewType({ viewType: "mobile" })
        );
      } else {
        dispatcher(
          platformViewsActions.setRenderViewType({ viewType: "desktop" })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!window.location.pathname.includes("/get-quote")) {
      window.quoteConfig = {};
    }
  }, [location]);

  return (
    <>
      {window.location.pathname === "/" && platformView === "desktop" ? (
        <HomePageHeader />
      ) : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={auth.isAuthenticated ? <Navigate to="/get-quote" replace /> : <HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/updated-password" element={<UpdatedPasswordPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        {platformView === "mobile" ? (
          <Route path="/account" element={<MobileAccountPage />} />
        ) : (
          <Route path="/account" element={<AccountPage />} />
        )}
        <Route path="/user-management" element={<MobileUsersPage />} />
        <Route path="/get-quote" element={<GetQuotePage />}>
          <Route index element={<Navigate to="ltl" replace />} />
          <Route path="ltl" element={<GetQuoteLTLPage />} />
          {/* <Route path="ftl" element={<GetQuoteFTLPage />} /> */}
          <Route path="container" element={<GetQuoteContainerPage />} />
        </Route>
        <Route path="get-quote-result" element={<QuoteResult />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="shipment-details/:id" element={<ShipmentDetailsPage />} />
        <Route path="get-batch-quote" element={<BatchQuotePage />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="/blog" element={<ComingSoonPage />} />
        <Route path="/a/new-password-page" element={<ForgotResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {auth.isAuthenticated ? <LoggedInFooter /> : <HomePageFooter />}
      <Modal />
    </>
  );
}

export default App;
