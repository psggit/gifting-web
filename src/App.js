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
import {createSession, clearSession, getUsername} from 'Utils/session-utils'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import NotifyError from './NotifyError';

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      username: "",
      isLoggedIn: false
    }
    this.handleSignOut = this.handleSignOut.bind(this)
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
          //console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          this.setState({isLoggedIn: false})
          console.log("location", location.pathname.split("/"))
          if(location.pathname.split("/")[1] && location.pathname.split("/")[1] !== 0)
          {
            location.href="/"
          }
          //this.handleSignOut()
          return
        }
        response.json().then((data) => {
          //console.log("data", data, data.username)
          this.setState({username: data.username, isLoggedIn: true})
          localStorage.setItem("sender_mobile", data.mobile)
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

  handleSignOut() {
    const fetchOptions = {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      mode: 'cors',
    }

    fetch(`${Api.blogicUrl}/consumer/auth/user/logout`, fetchOptions)
      .then((response) => {
        this.setState({isLoggedIn: false})
        //location.href = "/"
        //setTimeout(() => {
        clearSession()
        //}, 1000)
      })
      .catch((err) => {
        //console.log("Error in logout", err)
        mountModal(NotifyError({}))
      })
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
    console.log("this.state", this.state)
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Router history={history}>
          <Switch>
            <Route exact 
              path="/" 
              //component={LandingPage} 
              render={
                props => (
                  <LandingPage {...props} 
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
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
            <Route exact 
              path="/using-gift-card"
              render={
                props => (
                  <UsingGiftCard {...props} 
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
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
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
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
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
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
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
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
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )
              } 
            />
            <Route exact 
              path="/FAQ" 
              //component={FAQ} 
              render={
                props => (
                  <FAQ {...props} 
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )
              } 
            />
            <Route exact 
              path="/transaction-successful" 
              //component={TransactionSuccessful} 
              render={
                props => (
                  <TransactionSuccessful {...props} 
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )
              } 
            />
            <Route exact 
              path="/transaction-failure" 
              //component={TransactionFail} 
              render={
                props => (
                  <TransactionFail {...props} 
                    name={this.state.username} 
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )
              } 
            />
            <Route 
              path="/locationMap" 
              component={LocationMap} 
            />
            <Route exact path="*" component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App