import React from "react"
import ReactDOM from "react-dom"
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
import RetailOutlet from './RetailOutlet'

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {

  constructor() {
    super() 
    this.state = {
      isMobile: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.display.bind(this))
    localStorage.setItem("isLoadingFirstTime", true)
  }

  display() {
    if(location.pathname.includes("sign-in")) {
      if(document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth <= 1024) {
        this.setState({isMobile: true})
      } else {
        this.setState({isMobile: false})
      }
    }
  }
  
  componentWillUnmount() {
    window.addEventListener('resize')
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
            <Route exact path="/retail-outlet" component={RetailOutlet} />
            <Route exact path="*" component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App