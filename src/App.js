import React from "react"
import ReactDOM from "react-dom"
import GiftCards from './GiftCards/index'
import Header from 'Components/header'

class App extends React.Component {
  render() {
    return (
      <GiftCards />
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById("app"))