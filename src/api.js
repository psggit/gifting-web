import { POST, GET } from 'Utils/fetch'
//import Notify from 'Components/notify'

export function fetchTransactionList (payloadObj, successCallback, failureCallback) {
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

export function fetchAvailableHipbarDelivery(successCallback) {
  return GET({
    api: `/consumer/where_hipbar_delivery_available`,
    apiBase: 'loki',
    //data: payloadObj,
    handleError: true
  })
    .then((json) => {
      successCallback(json)
    })
    .catch(err => {
      console.log("Error in fetching available hipbar deliveries", err)
    })
}

export function fetchRetailers(payloadObj, successCallback, failureCallback) {
  return POST({
    api: `/retailerDiscovery/getRetailers`,
    apiBase: 'catman',
    data: payloadObj,
    handleError: true
  })
    .then((json) => {
      console.log("success call back", json)
      successCallback(json)
    })
    .catch(err => {
      console.log("Error in fetching available hipbar deliveries", err)
      failureCallback()
    })
}
