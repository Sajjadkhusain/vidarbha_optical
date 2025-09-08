import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { ToastContainer } from "react-toastify";
import { ProductsProvider } from "./context/ProductsContext";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Custom hook to detect route changes
const useRouteChangeLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Simulate route change detection
    handleStart();

    const timer = setTimeout(() => {
      handleComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return isLoading;
};

// Component that uses the route change hook
const RouteChangeHandler = ({ children }) => {
  const isLoading = useRouteChangeLoader();

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
};

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <ProductsProvider>
      <AppProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <RouteChangeHandler>
                      <HomePage />
                    </RouteChangeHandler>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <RouteChangeHandler>
                      <CartPage />
                    </RouteChangeHandler>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <RouteChangeHandler>
                      <WishlistPage />
                    </RouteChangeHandler>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <RouteChangeHandler>
                      <CheckoutPage />
                    </RouteChangeHandler>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <RouteChangeHandler>
                      <ProductDetailPage />
                    </RouteChangeHandler>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              progressStyle={{ background: "#c34f4f" }}
              toastStyle={{
                background: "#c34f4f",
                color: "white",
              }}
            />
          </div>
        </Router>
      </AppProvider>
    </ProductsProvider>
  );
}

export default App;
