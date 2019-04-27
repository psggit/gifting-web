import React from "react"
import "./loader.scss"

export default function Loader() {
  return (
    <div className="loader--container">
      <div class="loading">
      </div>
      <p style={{ marginTop: "10px", letterSpacing: "1px" }}>LOADING...</p>
    </div>
  )
}