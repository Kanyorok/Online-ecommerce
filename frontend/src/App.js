import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import store  from "./store";
import UpdatePassword from "./components/user/UpdatePassword";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import "./App.css";

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" Component={Home} exact />
            <Route path="/Search/:keyword" Component={Home} />
            <Route path="/product/:id" Component={ProductDetails} exact />
            <Route path="/cart" Component={Cart}/>
            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/password/forgot" Component={ForgotPassword}/>
            <Route path="/password/reset/:token" Component={NewPassword}/>
            <Route element={<ProtectedRoute/>}>
              <Route path="/password/update/" element={<UpdatePassword/>}/>
              <Route path="/me" element={<Profile/>} />
              <Route path="/me/update" element={<UpdateProfile/>} />
              <Route path="/shipping" element={<Shipping/>} /> 
              <Route path="/order/confirm" element={<ConfirmOrder/>} />
            </Route>           
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
