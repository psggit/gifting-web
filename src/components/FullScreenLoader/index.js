import React from "react"
import "./loader.scss"

export default function FullScreenLoader() {
  return (
    <div id="fullscreen-loader">
      <div className="loader--container">
        <div className="loading">
        </div>
        <p style={{ marginTop: "10px", letterSpacing: "1px" }}>LOADING...</p>
      </div>
    </div>
  )
}