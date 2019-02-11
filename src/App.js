import React from "react"
import ReactDOM from "react-dom"
// import "preact/debug"
import {Switch} from "react-router-dom"
import {
  Route
} from "react-router-dom"
import { Router } from "react-router"
import CreateHistory from 'history/createBrowserHistory'
import LegalDrinkingAge from './LegalDrinkingAge'
import RedeemingGiftCard from './RedeemingGiftCard'
import LandingPage from "./landing"
import SendGiftCards from './SendGift'
import SendGiftV2 from './SendGiftV2'
import TransactionHistory from "./TransactionHistory"
import Checkout from "./Payment"
import RetailOutlet from './RetailOutlet'
import FAQ from "./FAQ"
import LocationMap from "./LocationMap"
import ProductListing from './ProductListing'
import ProductDetails from "./ProductDetails"
import PaymentStatus from "./payment-status"

import {ThemeProvider, ThemeContext} from "./ThemeProvider"
import Header from "Components/header"
import Footer from "Components/footer"
import GiftBasket from "./GiftBasket"
// import NotFound from "./NotFound"
// import makeAsyncComponent from './makeAsyncComponent'

// const UsingGiftCard = makeAsyncComponent(() => import("./GiftCardInfo").then(module => module.default), { name: "Page 1" })
// const SendGiftCards = makeAsyncComponent(() => import("./SendGift").then(module => module.default), { name: "Page 1" })
// const TransactionHistory = makeAsyncComponent(() => import("./TransactionHistory").then(module => module.default), { name: "Page 1" })
// const Checkout = makeAsyncComponent(() => import("./Payment").then(module => module.default), { name: "Page 1" })
// const RetailOutlet = makeAsyncComponent(() => import("./RetailOutlet").then(module => module.default), { name: "Page 1" })
// const FAQ = makeAsyncComponent(() => import("./FAQ").then(module => module.default), { name: "Page 1" })


const history = CreateHistory()

// console.log(bolt)
const ThemeConsumer = ThemeContext.Consumer

const styles = {
  dark: {
    backgroundColor: "black",
    color: "white"
  },
  light: {
    backgroundColor: "white",
    color: "black"
  }
}

const brandProps = window.BRAND_STATE
delete window.BRAND_STATE

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
                    path="/send-gift" 
                    //component={SendGiftCards} 
                    render={
                      props => (
                        <SendGiftCards {...props} 
                          paramObj={paramObj}
                        />
                      )
                    } 
                  />
                  <Route exact
                    path="/sendgiftv2"
                    render={
                      props => (
                        <SendGiftV2 {...props}
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
                  <Route exact path="/payment-status" component={PaymentStatus}  />
                  <Route exact path="/legal-drinking-age" component={LegalDrinkingAge}  />
                  <Route exact path="/brands/:citySlug/:genreSlug/:brandSlug"
                    render={ props => (
                      <ProductDetails brand={brandProps} {...props} context={paramObj} />
                    )}/>
                  <Route exact path="/brands/:citySlug/:genreSlug"
                    render={ props => (
                      <ProductListing {...props} context={paramObj} />
                    )}/>
                  <Route exact path="/basket"
                    render={ props => (
                      <GiftBasket {...props} context={paramObj} />
                    )}/> 
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
  ReactDOM.render(<Header />, document.getElementById("header"))
  ReactDOM.render(<App />, document.getElementById("app"))
  ReactDOM.render(<Footer />, document.getElementById("footer"))
} else {
  ReactDOM.hydrate(<App />, document.getElementById("app"))
  ReactDOM.render(<Header />, document.getElementById("header"))
  ReactDOM.render(<Footer />, document.getElementById("footer"))
}
export default App