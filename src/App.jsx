import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/layout/Footer/Footer";
import HeaderNav from "./components/layout/NavBar/HeaderNav";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <ToastContainer />

      {pathname !== "/login" && <HeaderNav />}

      <AppRoutes />

      {pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
