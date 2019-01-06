import React from 'react'

class AccordianItem extends React.Component {
  render() {
    return (
      <div className={`accordian-item ${this.props.activeAccordian === this.props.id ? 'active' : '' }`}>
        <div id={this.props.id} onClick={this.props.handleClick} className="accordian-item__header">
          <p className="os s7">{ this.props.title }</p>
          {
            this.props.icon &&
            <span className="icon">{this.props.icon}</span>
          }
        </div>
        <div className="accordian-item__body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AccordianItem
