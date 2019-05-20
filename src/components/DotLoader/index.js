import React from "react"
import "./dot-loader.scss"

const DotLoader = () => (
  <div id="dotted-loader">
    <div className="browser-screen-loading-content">
      <div className="loading-dots dark-gray">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </div>
)

export default DotLoader