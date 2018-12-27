import { POST, GET } from 'Utils/fetch'
//import Notify from 'Components/notify'

export function fetchTransactionList (payloadObj, successCallback, failureCallback) {
  console.log("payload", payloadObj)
  return POST({
    api: `/consumer/transactionsv3/gifts_sent_all`,
    apiBase: 'orderman',
    data: payloadObj,
    handleError: true
  })
    .then((json) => {
      successCallback()
      //successCallback(json)
      //console.log("success", json)
    })
    .catch(err => {
      failureCallback()
      //console.log("failure")
      // console.log("Error in fetching organisation list", err)
      // err.response.json().then(json => { Notify("danger", json.error) })
      // failureCallback()
    })
}
