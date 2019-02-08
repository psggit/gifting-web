import React from 'react'
import { unmountComponentAtNode } from 'react-dom'

class ModalBox extends React.Component {
  handleClick(e) {
    if (e.keyCode == 27) {
      unmountComponentAtNode(document.getElementById('confirm-modal'))
      document.body.setAttribute('style', 'auto')
    }
  }

  handlePress(e) {
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
      <div id="modal-box">
        <div className='modal-overlay'>
          <div className='modal-box'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default ModalBox
