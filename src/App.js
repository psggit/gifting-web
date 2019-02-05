import React from "react"
import ReactDOM from "react-dom"
// import "preact/debug"
import {Switch} from "react-router-dom"
import {
  Route
} from "react-router-dom"
import AgeGate from './AgeGate'
import { Router } from "react-router"
import CreateHistory from 'history/createBrowserHistory'
import LegalDrinkingAge from './LegalDrinkingAge'
import RedeemingGiftCard from './RedeemingGiftCard'
import LandingPage from "./landing"
import UsingGiftCard from './GiftCardInfo'
import SendGiftCards from './SendGift'
import SendGiftWizardStep1 from './SendGiftWizardStep1'
import MobileGetStarted from './MobileGetStarted'
import MobileName from './MobileName'
import MobileCity from './MobileCity'
import MobileFavDrink from './MobileFavDrink'
import TransactionHistory from "./TransactionHistory"
import Checkout from "./Payment"
import RetailOutlet from './RetailOutlet'
import FAQ from "./FAQ"
import TransactionSuccessful from "./SuccessfulTransaction"
import TransactionFail from "./FailureTransaction"
import LocationMap from "./LocationMap"
import ProductListing from './ProductListing'
import ProductDetails from "./ProductDetails"
import { Api } from "Utils/config"
import {clearSession} from 'Utils/session-utils'
import { mountModal } from 'Components/modal-box/utils'
import NotifyError from './NotifyError'
import PaymentStatus from "./payment-status"

import {ThemeProvider, ThemeContext} from "./ThemeProvider"
import Header from "Components/header"
import Footer from "Components/footer"
import GiftBasket from "./GiftBasket";
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

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      username: "",
      isLoggedIn: false,
      key: 0
    }
    //this.handleSignOut = this.handleSignOut.bind(this)
  }

  // componentWillMount() {
  //   const fetchOptions = {
  //     method: 'get',
  //     credentials: 'include',
  //     mode: 'cors',
  //     'x-hasura-role': 'user'
  //   }
  //   // https://auth.hipbar-dev.com/user/account/info
  //   fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         //console.log(`Looks like there was a problem. Status Code: ${response.status}`)
  //         this.setState({isLoggedIn: false})
  //         // if(location.pathname.split("/")[1] && location.pathname.split("/")[1] !== 0)
  //         // {
  //         //   location.href="/"
  //         // }
  //         return
  //       }
  //       response.json().then((data) => {
  //         this.setState({username: data.username, isLoggedIn: true})
  //         localStorage.setItem("sender_mobile", data.mobile)
  //       })
  //     })
  //     .catcconsth((err) => {
  //       // console.log('Fetch Error :-S', err)
  //       // if(location.pathname.split("/")[1] && location.pathname.split("/")[1] !== 0)
  //       // {
  //       //   location.href="/"
  //       // }
  //     })
  // }
 
  componentDidMount() {
    history.listen(location => {
      this.setState({ key: this.state.key + 1 })
    })
  }

  // handleClick(e) {
  //   var historyTraversal = event.persisted || 
  //                         ( typeof window.performance != "undefined" && 
  //                           window.performance.navigation.type === 2 )
  //   if (!historyTraversal ) {
  //     if((localStorage.getItem("showAgeGate") === "true" && !localStorage.getItem("hasura-id") && !location.pathname.split("/")[1])) {
  //       //mountModal(AgeGate({}))
  //     }
  //   }
  // }

  // handleSignOut() {
  //   const fetchOptions = {
  //     method: 'get',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     //credentials: 'include',
  //     mode: 'cors',
  //   }

  //   fetch(`${Api.blogicUrl}/consumer/auth/user/logout`, fetchOptions)
  //     .then((response) => {
  //       this.setState({isLoggedIn: false})
  //       //location.href = "/"
  //       //setTimeout(() => {
  //       clearSession()
  //       //}, 1000)
  //     })
  //     .catch((err) => {
  //       //console.log("Error in logout", err)
  //       mountModal(NotifyError({}))
  //     })
  // }


  // display() {
  //   if(location.pathname.includes("sign-in")) {
  //     if(document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth <= 1024) {
  //       this.setState({isMobile: true})
  //     } else {
  //       this.setState({isMobile: false})
  //     }
  //   }
  // }
  
  // componentWillUnmount() {
  //   window.addEventListener('resize')
  // }

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
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <ThemeProvider>
          <ThemeConsumer>
            {(paramObj) => {
              //console.log(paramObj)
              return (
                <div>
                  {
                    !location.pathname.includes("locationMap") &&
                    <Header />
                  }
                  
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
                      {/* <Route exact path="/sign-in" component={SignIn} /> */}
                      {/* <Route 
                        path='/sign-in' 
                        render={
                          props => (
                            <SignIn isMobile={this.state.isMobile} />
                          )
                        } 
                      /> */}
                      
                      {/* <Route exact 
                        path="/using-gift-card"
                        render={
                          props => (
                            <UsingGiftCard {...props} 
                              // name={this.state.username} 
                              // isLoggedIn={this.state.isLoggedIn}
                            />
                          )
                        } 
                        //component={UsingGiftCard} 
                      /> */}

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
                        path="/send-gift-wizard-step1"
                        render={
                          props => (
                            <SendGiftWizardStep1 {...props}
                              paramObj={paramObj}
                            />
                          )
                        }
                      />

                      <Route exact
                        path="/mobile-get-started"
                        render={
                          props => (
                            <MobileGetStarted {...props}
                              paramObj={paramObj}
                            />
                          )
                        }
                      />

                      <Route exact
                        path="/mobile-name"
                        render={
                          props => (
                            <MobileName {...props}
                              paramObj={paramObj}
                            />
                          )
                        }
                      />

                      <Route exact
                        path="/mobile-city"
                        render={
                          props => (
                            <MobileCity {...props}
                              paramObj={paramObj}
                            />
                          )
                        }
                      />

                      <Route exact
                        path="/mobile-fav-drink"
                        render={
                          props => (
                            <MobileFavDrink {...props}
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
                      {/* <Route exact 
                        path="/transaction-successful" 
                        //component={TransactionSuccessful} 
                        render={
                          props => localStorage.getItem("txn")
                            ? <TransactionSuccessful {...props} />
                            : <NotFound />
                        } 
                      />
                      <Route exact 
                        path="/transaction-failure" 
                        //component={TransactionFail} 
                        render={
                          props => localStorage.getItem("txn")
                            ? <TransactionFail {...props} />
                            : <NotFound />
                        } 
                      /> */}
                      <Route 
                        path="/locationMap" 
                        component={LocationMap} 
                      />
                      <Route exact path="/payment-status" component={PaymentStatus}  />
                      <Route exact path="/legal-drinking-age" component={LegalDrinkingAge}  />
                      <Route exact path="/brands/:citySlug/:genreSlug"
                        render={ props => (
                          <ProductListing {...props} context={paramObj} />
                        )}/>
                      <Route exact path="/brands/:citySlug/:genreSlug/:brandSlug"
                        render={ props => (
                          <ProductDetails {...props} context={paramObj} />
                        )}/>
                    </Switch>
                  </Router>
                  {
                    !location.pathname.includes("locationMap") &&
                    <Footer />
                  }
                 
                </div>
              )
            }}
          </ThemeConsumer>
        </ThemeProvider>
      </div>
    )
  }
}



if (!document.getElementById("app").childNodes.length) {
  ReactDOM.render(<App />, document.getElementById("app"))
} else {
  ReactDOM.render(<Header />, document.getElementById("header"))
  ReactDOM.render(<Footer />, document.getElementById("footer"))
}
export default App