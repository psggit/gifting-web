import React from "react"
import ReactDOM from "react-dom"
import "preact/debug"
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

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {

  constructor() {
    super() 
    this.state = {
      isMobile: false,
      proceedToPaymemt: false
    }
    this.getPostForm = this.getPostForm.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.display.bind(this))
    localStorage.setItem("isLoadingFirstTime", true)
    const formData = new FormData()
   const data = ` key~gtKFFx
    txnid~G010249047181
    amount~300
    productinfo~gift
    firstname~Arun
    email~arunkushore@hip.com
    phone~9843176540
    lastname~garg
    surl~http://localhost:8080/transaction?status=success
    furl~http://localhost:8080/transaction?status=failure
    curl~http://localhost:8080/transaction?status=cancelled
    hash~fadc202fd9bf5dd4c15cfd269757a78de34c497a387609a587db7fa318a54077abfcc21ed9385264ad7a91bf96eefa53fc17cd1faccda89d01afec32dc0c0396
    ccnum~5123456789012346
    ccname~Madhur Garg
    pg~DC
    bankcode~ICIB  
    ccvv~123
    ccexpmon~05
    ccexpyr~2020
    udf1~web`

    this.dataArr = data.split("\n").map(item => item.trim())
    this.setState({ proceedToPaymemt: true })
    // console.log(dataArr)
    // dataArr.forEach(item => {
    //   formData.append(item.split(":")[0], item.split(":")[1])
    //   formData.append()
    // })

    // POST({
    //   api: " https://test.payu.in/_payment",
    //   prependBaseUrl: false,
    //   handleError: true,
    //   type: "Public",
    //   data: formData
    // })
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
            <Route exact path="*" component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App