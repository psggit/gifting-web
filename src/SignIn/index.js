import React from 'react'
// import ModalHeader from 'Components/modal-box/ModalHeader'
// import ModalFooter from 'Components/modal-box/ModalFooter'
// import ModalBody from 'Components/modal-box/ModalBody'
// import ModalBox from 'Components/modal-box'
// import Icon from "Components/icon"
import { unMountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box';

export default function SignIn(data) {
  return class SignIn extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <ModalBox>
          <div id="SignIn">
            <div className="header">
              Sign In / Sign Up with mobile number
            </div>
            {/* <div className="body">
              <label>Phone Number</label>
              <input type="text" />
            </div>
            <div className="footer">
              <button className='btn btn-secondary' onClick={unMountModal}>CANCEL</button>
              <button className='btn btn-secondary' onClick={unMountModal}>PROCEED</button>
            </div> */}
          </div>
        </ModalBox>
      )
    }
  }
}