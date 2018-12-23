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
import UsingGiftCard from './GiftCards'

const history = CreateHistory()

class App extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Header />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/using-gift-card" component={UsingGiftCard} />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App