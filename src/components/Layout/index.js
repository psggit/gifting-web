import React from "react"
import "./layout.scss"

class Layout extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div 
        className="main-container" 
        style={{backgroundImage: `url(./../../../images/${this.props.image})`}}
        //style={{backgroundImage: `url('https://lh3.googleusercontent.com/-zjl7s0bu8cw/XF7JYk2T7PI/AAAAAAAAANI/IuUxUqR3qwQH0h5S1mfkVH-t8xsDouqfwCL0BGAYYCw/h1530/2019-02-09.png')` }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Layout