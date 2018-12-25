import { POST } from 'Utils/fetch'
//import Notify from 'Components/notify'

export function verifyUser (payloadObj, successCallback, failureCallback) {
  return POST({
    api: '/consumer/auth/otp-login',
    apiBase: 'blogicUrl',
    data: payloadObj,
    handleError: true
  })
    .then((json) => {
      //successCallback(json)
      console.log("success")
    })
    .catch(err => {
      console.log("failure")
      // console.log("Error in fetching organisation list", err)
      // err.response.json().then(json => { Notify("danger", json.error) })
      // failureCallback()
    })
}
