import React from "react"
import "./legal-drinking-age.scss"
import {StatesList} from "./legalDrinkingAge"

class LegalDrinkingAge extends React.Component {
  constructor(props) {
    super(props)
    this.renderState = this.renderState.bind(this)
  }

  renderState(item) {
    return (
      <div className="state">
        <span className="os s5" style={{ textAlign: "left" }}>{item.state_name}</span>
        <span className="os s5" style={{ textAlign: "right" }}>{item.legal_age}</span>
      </div>
    )
  }

  render() {
    return (
      <div id="LegalDrinkingAge">
        <div className="container">
          <div className="content">
            <h2 className="cm s1">Legal drinking age by states/UTs</h2>
            <div className="state-list">
              <div className="header">
                <h2 className="os s7" style={{ textAlign: "left" }}>STATE/UT</h2>
              </div>
              {
                StatesList.map((item) => {
                  return this.renderState(item)
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LegalDrinkingAge