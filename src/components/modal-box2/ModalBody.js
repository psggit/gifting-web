import React from 'react'

class ModalBody extends React.Component {
  render () {
    return (
      <div className='modal-body' style={{width: this.props.width || "450px"}}>
        { this.props.children }
      </div>
    )
  }
}

export default ModalBody
