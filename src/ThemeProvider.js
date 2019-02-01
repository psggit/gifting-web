import React from "react";
import { render } from "react-dom";
import { Api } from "Utils/config"
import CreateHistory from 'history/createBrowserHistory'
const history = CreateHistory()

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
    const isMobile = window.innerWidth <= 640
    const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024
    const isLaptop = window.innerWidth > 1024

    this.setState({ isMobile, isTablet, isLaptop })

    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }
    // https://auth.hipbar-dev.com/user/account/info
    fetch(`${Api.blogicUrl}/consumer/settings/profile`, fetchOptions)
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
          this.setState({username: data.consumer.full_name, isLoggedIn: true, mobile: data.consumer.mobile_number})
          localStorage.setItem("sender_mobile", data.consumer.mobile_number)
          localStorage.setItem("email", data.consumer.email)
          // localStorage.setItem("username", data.username)
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
      isLoggedIn: this.state.isLoggedIn,
      history,
      isMobile: this.state.isMobile,
      isTablet: this.state.isTablet,
      isLaptop: this.state.isLaptop
    }
    //console.log("theme provider", paramObj)
    return (
      <ThemeContext.Provider value={paramObj}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}