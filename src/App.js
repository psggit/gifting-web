import React from "react"
import ReactDOM from "react-dom"
// import "preact/debug"
import {Switch} from "react-router-dom"
import {
  Route
} from "react-router-dom"

import { Router } from "react-router"
import CreateHistory from 'history/createBrowserHistory'

import LandingPage from "./landing"
import UsingGiftCard from './GiftCardInfo'
import SendGiftCards from './SendGift'
import SignIn from './SignIn'
import TransactionHistory from "./TransactionHistory"
import Checkout from "./Payment"
import RetailOutlet from './RetailOutlet'
import FAQ from "./FAQ"
import TransactionSuccessful from "./SuccessfulTransaction"
import TransactionFail from "./FailureTransaction"
import LocationMap from "./LocationMap"
import { Api } from "Utils/config"

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {
  constructor() {
    super() 
    // this.state = {
    //   isMobile: false
    // }
  }

  componentWillMount() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }
    // https://auth.hipbar-dev.com/user/account/info
    fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          // if (location.pathname !== '/login') {
          //   location.href = '/login'
          // }
          return
        }
        response.json().then((data) => {
          localStorage.setItem("sender_mobile", data.mobile)
          // if (!location.pathname.includes('home')) {
          //   location.href = '/home/live-ottp'
          // }
        })
      })
      .catch((err) => {
        // console.log('Fetch Error :-S', err)
        // if (location.pathname !== '/login') {
        //   location.href = '/login'
        // }
      })
  }

  componentDidMount() {
    //window.addEventListener('resize', this.display.bind(this))
    localStorage.setItem("isLoadingFirstTime", true)
  }

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
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Route exact path="/sign-in" component={SignIn} /> */}
            {/* <Route 
              path='/sign-in' 
              render={
                props => (
                  <SignIn isMobile={this.state.isMobile} />
                )
              } 
            /> */}
            <Route exact path="/using-gift-card" component={UsingGiftCard} />
            <Route exact path="/send-gift" component={SendGiftCards} />
            <Route exact path="/transaction-history" component={TransactionHistory} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/retail-outlet" component={RetailOutlet} />
            <Route exact path="/FAQ" component={FAQ} />
            <Route exact path="/transaction-successful" component={TransactionSuccessful} />
            <Route exact path="/transaction-failure" component={TransactionFail} />
            <Route path="/locationMap" component={LocationMap} />
            <Route exact path="*" component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App