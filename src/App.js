import React from "react"
import ReactDOM from "react-dom"
import Header from "Components/header"
import Footer from "Components/footer"

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Footer />
      </React.Fragment>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById("app"))