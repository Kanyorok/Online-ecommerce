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
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
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

            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/me" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
