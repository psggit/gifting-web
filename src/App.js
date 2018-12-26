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

const history = CreateHistory()

// console.log(bolt);


class App extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/using-gift-card" component={UsingGiftCard} />
            <Route exact path="/send-gift" component={SendGiftCards} />
            <Route exact path="*" component={() => <h1>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App