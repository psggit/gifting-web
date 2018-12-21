import React from "react"
import ReactDOM from "react-dom"
import Header from "Components/header"

class App extends React.Component {
  render() {
    return (
      <Header />
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById("app"))