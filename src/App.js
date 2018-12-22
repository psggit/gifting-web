import React from "react"
import ReactDOM from "react-dom"
import Header from "Components/header"
import {
  Route
} from "react-router-dom"

import { Router } from "react-router"
import CreateHistory from 'history/createBrowserHistory'

import LandingPage from "./landing"

const history = CreateHistory()

class App extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Header />
        <Router history={history}>
          <Route exact path="/" component={LandingPage} />
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
export default App