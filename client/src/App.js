import './App.css';
import {  useReducer, useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/Home.js"
import ProductPage from "./components/ProductPage/ProductPage"
import AllProducts from "./components/Products/AllProducts/AllProducts"
import Signin from "./components/Signin/Signin"
import Signup from "./components/Signup/Signup"
import Profile from "./components/profile/Profile"
import WishList from "./components/WishList/WishList"
import Cart from "./components/Cart/Cart"
import Orders from "./components/Orders/Orders"
import AccountDetails from "./components/AccountDetails/AccountDetails"
import OrderSucess from "./components/Modals/OrderSucess/OrderSucess"
import FourOFourError from "./components/Errors/FourOFourError.js"
import FIVEOO from "./components/Errors/FIVEOO"
import "./components/navbar/navbar.css"
import "./components/home/Home.css"

import { UserContext } from "./contexts/UserContext"
import { reducer, initialState } from "./reducers/UserReducer"
import ForgotPass from "./components/forgotPassword/ForgotPass"
import ResetPassword from "./components/forgotPassword/ResetPassword"

function Routing() {
  const { dispatch } = useContext(UserContext);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })

    }

  }, [])

  return <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={AllProducts} />
      <Route path="/sign-in" exact component={Signin} />
      <Route path="/sign-up" exact component={Signup} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/wishlist" exact component={WishList} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/forgot-password" component={ForgotPass} />
      <Route path="/account-details" component={AccountDetails} />
      <Route path="/order-success" component={OrderSucess} />
      <Route path="/product/:productid" exact component={ProductPage} />
      <Route path="/reset-password/:resetToken" exact ><ResetPassword /> </Route>
      <Route path="/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf" component={FIVEOO} />
      <Route path="/ERROR404/aoisdfhaisohdfoashfoasidfhasoidfhoasifh" component={FourOFourError} />
      <Route path="*" render={() => <Redirect to='/ERROR404/aoisdfhaisohdfoashfoasidfhasoidfhoasifh' />} />
    </Switch>
  </>
}

function App() {
 
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">

      <UserContext.Provider value={{ state, dispatch }}>
       <Router>

          <Routing />
        </Router>
      </UserContext.Provider>


    </div>
  );
}

export default App;
