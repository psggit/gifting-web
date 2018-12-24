import React from 'react'

class ModalBox extends React.Component {
  render () {
    return (
      <div className='modal-overlay'>
        <div className='modal-box'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default ModalBox
