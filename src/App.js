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
  constructor() {
    super()
    this.state = {
      proceedToPaymemt: false
    }

    this.getPostForm = this.getPostForm.bind(this)
  }
  getPostForm() {
    return this.dataArr.map((item, i) => {
      const key = item.split("~")[0]
      const value = item.split("~")[1]

      return <input key={i} type="hidden" name={key} value={value} /> 
    })
  }

  componentDidMount() {
    const formData = new FormData()
   const data = ` key~gtKFFx
    txnid~G01021200623269
    amount~210
    productinfo~gift
    firstname~Arun
    email~arunkushore@hip.com
    phone~9843176540
    lastname~garg
    surl~http://localhost:8080/transaction?status=success
    furl~http://localhost:8080/transaction?status=failure
    curl~http://localhost:8080/transaction?status=cancelled
    hash~78fe602be97d798c249351648edf3a90f039cc1c2902daa49c104339d0906f326814bc363de9f69dbaae7a8f81de88763eb941c04f99451422e4e52d6ae98544
    ccnum~5123456789012346
    ccname~Madhur Garg
    pg~DC
    bankcode~ICIB  
    ccvv~123
    ccexpmon~05
    ccexpyr~2020
    udf1~ios`

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
        {
          this.state.proceedToPaymemt
            ? (
              <form action='https://test.payu.in/_payment' method='post'>
                {
                  this.getPostForm() 
                }
                <input type="submit" value="submit"></input>
              </form>
            )
            : ""
        }
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App