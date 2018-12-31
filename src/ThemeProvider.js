import React from "react";
import { render } from "react-dom";
import { Api } from "Utils/config"

export const ThemeContext = React.createContext("light")
export class ThemeProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      isLoggedIn: "",
      mobile: ""
    }
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
          // if(location.pathname.split("/")[1] && location.pathname.split("/")[1] !== 0)
          // {
          //   location.href="/"
          // }
          return
        }
        response.json().then((data) => {
          this.setState({username: data.username, isLoggedIn: true, mobile: data.mobile})
          //localStorage.setItem("sender_mobile", data.mobile)
        })
      })
      .catch((err) => {
        // console.log('Fetch Error :-S', err)
        // if(location.pathname.split("/")[1] && location.pathname.split("/")[1] !== 0)
        // {
        //   location.href="/"
        // }
      })
  }

  render() {
    const paramObj = {
      username: this.state.username,
      mobile: this.state.mobile,
      isLoggedIn: this.state.isLoggedIn
    }
    return (
      <ThemeContext.Provider value={paramObj}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}