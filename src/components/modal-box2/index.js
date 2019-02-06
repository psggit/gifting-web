import React from 'react'
import './index.scss'
import { unmountComponentAtNode } from 'react-dom'
import ReactDOM from 'react-dom';

class ModalBox extends React.Component {
  constructor() {
    super()
  }
  handlePress(e) {
    if (e.keyCode == 27) {
      unmountComponentAtNode(document.getElementById('confirm-modal'))
      document.body.setAttribute('style', 'auto')
    }
  }

  handleClick(e) {
    if (e.target.className === 'modal-overlay') {
      unmountComponentAtNode(document.getElementById('confirm-modal'))
      document.body.setAttribute('style', 'auto')
    }
  }

  // setModalContainerWidth(width) {
  //   this.setState({ width })
  // }

  componentDidMount() {
    // window.addEventListener('mousedown', this.handleClick)
    // window.addEventListener('keyup', this.handleClick)
    // document.addEventListener('mouseup', this.handlePress)
  }
  componentWillUnmount() {
    // window.removeEventListener('mousedown', this.handleClick)
    // window.addEventListener('keyup', this.handleClick)
    // document.removeEventListener('mouseup', this.handlePress)
  }
  render () {
    return (
      <div id="modal-box2">
        <div className='modal-overlay'>
          <div className='modal-container'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
export default ModalBox
