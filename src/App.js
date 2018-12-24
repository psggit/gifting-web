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
import SignIn from './SignIn'

const history = CreateHistory()

class App extends React.Component {

  constructor() {
    super() 
    this.state = {
      isMobile: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.display.bind(this))
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
        {
          !location.pathname.includes("sign-in") &&
          <Header />
        }
       
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Route exact path="/sign-in" component={SignIn} /> */}
            <Route 
              path='/sign-in' 
              render={
                props => (
                  <SignIn isMobile={this.state.isMobile} />
                )
              } 
            />
            <Route exact path="/using-gift-card" component={UsingGiftCard} />
          </Switch>
        </Router>
        {
          !location.pathname.includes("sign-in") &&
          <Footer />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App