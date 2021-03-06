import React from "react"
import ReactDOM from "react-dom"
// import "preact/debug"
import { Switch } from "react-router-dom"
import {
  Route
} from "react-router-dom"
import { Router } from "react-router"
import { createBrowserHistory as createHistory } from 'history'
import LegalDrinkingAge from "./LegalDrinkingAge"
import RedeemingGiftCard from "./RedeemingGiftCard"
import LandingPage from "./landing-new"
import TransactionHistory from "./TransactionHistory"
import Checkout from "./Payment"
import RetailOutlet from "./RetailOutlet"
import FAQ from "./FAQ"
import Personalise from "./Personalise"
import LocationMap from "./LocationMap"
import ProductListing from "./ProductListing"
import ProductDetails from "./ProductDetails"
import PaymentStatus from "./payment-status"
import AgeGateAlert from "./AgeGateAlert"

import { ThemeProvider, ThemeContext } from "./ThemeProvider"
import Header from "Components/header"
import HeaderWithoutSignIn from "Components/headerWithoutSignin"
import GiftBasket from "./GiftBasket"

import GetStarted from "./SendGiftWizard/GetStarted"
import SelectName from "./SendGiftWizard/SelectName"
import SelectCity from "./SendGiftWizard/SelectCity"
import SelectFavDrink from "./SendGiftWizard/FavDrink"
import Footer from "Components/footer"
import SuccessfulTransaction from "./SuccessfulTransaction"
import FailureTransaction from "./FailureTransaction"
import AvailableCities from "./AvailableCities"
// import NotFound from "./NotFound"
// import makeAsyncComponent from "./makeAsyncComponent"

// const GetStarted = makeAsyncComponent(() => import("./SendGiftWizard/GetStarted").then(module => module.default), { name: "Page 1" })
// const SelectName = makeAsyncComponent(() => import("./SendGiftWizard/SelectName").then(module => module.default), { name: "Page 1" })
// const SelectCity = makeAsyncComponent(() => import("./SendGiftWizard/SelectCity").then(module => module.default), { name: "Page 1" })
// const SelectFavDrink = makeAsyncComponent(() => import("./SendGiftWizard/FavDrink").then(module => module.default), { name: "Page 1" })
// const RedeemingGiftCard = makeAsyncComponent(() => import("./RedeemingGiftCard").then(module => module.default), { name: "Page 1" })
// const TransactionHistory = makeAsyncComponent(() => import("./TransactionHistory").then(module => module.default), { name: "Page 1" })
// const Checkout = makeAsyncComponent(() => import("./Payment").then(module => module.default), { name: "Page 1" })
// const RetailOutlet = makeAsyncComponent(() => import("./RetailOutlet").then(module => module.default), { name: "Page 1" })
// const FAQ = makeAsyncComponent(() => import("./FAQ").then(module => module.default), { name: "Page 1" })


const history = createHistory()

// console.log(bolt)
const ThemeConsumer = ThemeContext.Consumer

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      isLoggedIn: false,
      key: 0
    }
  }

  getPostForm() {
    return this.dataArr.map((item, i) => {
      const key = item.split("~")[0]
      const value = item.split("~")[1]

      return <input key={i} type="hidden" name={key} value={value} />
    })
  }

  componentWillMount() {
    if (localStorage.getItem("hasura-id") || location.pathname === "/age-gate" || location.pathname === "/legal-drinking-age") {
      return true
    } else {
      if (!localStorage.getItem("age-gate__agreed")) {
        location.href = "/age-gate"
      }
    }
  }

  render() {
    //console.log("this.state", this.state)
    return (
      <ThemeProvider>
        <ThemeConsumer>
          {(paramObj) => {
            //console.log(paramObj)
            return (
              <Router key={this.state.key} history={history}>
                <Switch>
                  <Route exact
                    path="/"
                    render={
                      props => (
                        <LandingPage {...props}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/how-to-redeem"
                    render={
                      props => (
                        <RedeemingGiftCard {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  //component={UsingGiftCard} 
                  />

                  <Route exact
                    path="/transaction-successful"
                    render={
                      props => (
                        <SuccessfulTransaction {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  //component={UsingGiftCard} 
                  />

                  <Route exact
                    path="/transaction-failure"
                    render={
                      props => (
                        <FailureTransaction {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  //component={UsingGiftCard} 
                  />

                  <Route exact
                    path="/transaction-cancelled"
                    render={
                      props => (
                        <FailureTransaction {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  //component={UsingGiftCard} 
                  />

                  <Route exact
                    path="/send-gift/get-started"
                    //component={SendGiftCards} 
                    render={
                      props => (
                        <GetStarted {...props}
                          paramObj={paramObj}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/send-gift"
                    render={
                      props => (
                        <GetStarted {...props}
                          paramObj={paramObj}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/send-gift/select-name"
                    render={
                      props => (
                        <SelectName {...props}
                          paramObj={paramObj}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/send-gift/select-city"
                    render={
                      props => (
                        <SelectCity {...props}
                          paramObj={paramObj}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/send-gift/select-drink"
                    render={
                      props => (
                        <SelectFavDrink {...props}
                          paramObj={paramObj}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/transaction-history"
                    //component={TransactionHistory} 
                    render={
                      props => (
                        <TransactionHistory {...props}
                        //paramObj={paramObj}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/personalise"
                    //component={Checkout} 
                    render={
                      props => (
                        <Personalise {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />
                  <Route exact
                    path="/checkout"
                    //component={Checkout} 
                    render={
                      props => (
                        <Checkout {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />

                  {/* <Route exact 
                    path="/transaction-successful" 
                    //component={Checkout} 
                    render={
                      props => (
                        <TransactionSuccessful {...props} 
                          // name={this.state.username} 
                          // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    } 
                  />

                  <Route exact 
                    path="/transaction-failure" 
                    //component={Checkout} 
                    render={
                      props => (
                        <TransactionFail {...props} 
                          // name={this.state.username} 
                          // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    } 
                  /> */}

                  <Route exact
                    path="/retail-outlet"
                    //component={RetailOutlet} 
                    render={
                      props => (
                        <RetailOutlet {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/cities-serviceable"
                    //component={FAQ} 
                    render={
                      props => (
                        <AvailableCities {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />

                  <Route exact
                    path="/FAQs"
                    //component={FAQ} 
                    render={
                      props => (
                        <FAQ {...props}
                        // name={this.state.username} 
                        // isLoggedIn={this.state.isLoggedIn}
                        />
                      )
                    }
                  />

                  <Route
                    path="/locationMap"
                    component={LocationMap}
                  />
                  <Route exact path="/age-gate" component={AgeGateAlert} />
                  <Route exact path="/payment-status" component={PaymentStatus} />
                  <Route exact path="/legal-drinking-age" component={LegalDrinkingAge} />
                  <Route exact path="/brand/:stateSlug/:genreSlug/:citySlug/:brandSlug"
                    render={props => (
                      <ProductDetails {...props} context={paramObj} />
                    )} />
                  <Route exact path="/brands/:stateSlug/:genreSlug/:citySlug"
                    render={props => (
                      <ProductListing {...props} context={paramObj} />
                    )} />
                  <Route exact path="/basket"
                    render={props => (
                      <GiftBasket {...props} context={paramObj} />
                    )} />
                </Switch>
              </Router>
            )
          }}
        </ThemeConsumer>
      </ThemeProvider>
    )
  }
}

if (!document.getElementById("app").childNodes.length) {
  console.log("if")
  if (location.pathname !== "/age-gate") {
    ReactDOM.render(<Header />, document.getElementById("header"))
    if (document.getElementById("footer-wrapper")) {
      ReactDOM.render(<Footer />, document.getElementById("footer-wrapper"))
    }
  } else {
    document.getElementById("header").style.display = "none"
  }
  ReactDOM.render(<App />, document.getElementById("app"))
} else {
  console.log("else server")
  if (document.getElementById("header") && location.pathname !== "/legal-drinking-age") {
    ReactDOM.hydrate(<Header />, document.getElementById("header"))
  }
  if (document.getElementById("header") && location.pathname == "/legal-drinking-age") {
    ReactDOM.hydrate(<HeaderWithoutSignIn />, document.getElementById("header"))
  }
  if (document.getElementById("footer-wrapper")) {
    ReactDOM.render(<Footer />, document.getElementById("footer-wrapper"))
  }
  ReactDOM.hydrate(<App />, document.getElementById("app"))
}
export default App