import React from 'react'

class ModalBox extends React.Component {
  render () {
    return (
      <div className='modal-box'>
        { this.props.children }
      </div>
    )
  }
}

export default ModalBox
