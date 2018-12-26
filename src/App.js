import React from "react"
import ReactDOM from "react-dom"
import {Switch} from "react-router-dom"
import Header from "Components/header"
import Footer from "Components/footer"
import {
  Route
} from "react-router-dom"

import { Router } from "react-router"
import CreateHistory from 'history/createBrowserHistory'

import LandingPage from "./landing"
import UsingGiftCard from './GiftCardInfo'
import SendGiftCards from './SendGift'
import { POST } from "Utils/fetch"

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {
  componentDidMount() {
    const formData = new FormData()
   const data = ` key:gtKFFx
    txnid:G01021673406887
    amount:210
    productinfo:gift
    firstname:Arun
    email:arunkushore@hip.com
    phone:9843176540
    lastname:garg
    surl:https://hipbar.gifting.com/transaction?status=success
    furl:https://hipbar.gifting.com/transaction?status=failure
    curl:https://hipbar.gifting.com/transaction?status=cancelled
    hash:0db86a79cf839708c547c85fa40e4ecb0be977751c8e20990c63d8d2e6f956f1e8ec180ab48990bc009be31b6270b4ffd2b4ec3c0eb1d9b93d5bbc8ac01be529
    ccnum:4324435676788907
    ccname:Madhur Garg
    ccvv:345
    ccexpmon:06
    ccexpyr:202
    udf1:ios`

    const dataArr = data.split("\n").map(item => item.trim())
    // console.log(dataArr)
    dataArr.forEach(item => {
      formData.append(item.split(":")[0], item.split(":")[1])
      // formData.append()
    })

    POST({
      api: " https://test.payu.in/_payment",
      prependBaseUrl: false,
      handleError: true,
      type: "Public",
      data: formData
    })
    
  }
  render() {
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Header />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/using-gift-card" component={UsingGiftCard} />
            <Route exact path="/send-gift" component={SendGiftCards} />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App