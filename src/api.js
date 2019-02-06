import { POST, GET } from "Utils/fetch"
//import Notify from "Components/notify"

export function fetchTransactionList (payloadObj, successCallback, failureCallback) {
  return POST({
    api: `/consumer/transactionsv3/gifts_sent_all`,
    apiBase: "orderman",
    data: payloadObj,
    handleError: true
  })
    .then((json) => {
      console.log("Fetched transaction list", json)
      successCallback(json)
    })
    .catch(err => {
      console.log("Error in fetching transaction list", err)
      failureCallback()
      // err.response.json().then(json => { Notify("danger", json.error) })
    })
}

export function fetchAvailableHipbarDelivery(successCallback) {
  return GET({
    api: `/consumer/where_hipbar_delivery_available`,
    apiBase: "loki",
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
    apiBase: "catman",
    data: payloadObj,
    handleError: true
  })
    .then((json) => {
      //console.log("success call back", json)
      successCallback(json)
    })
    .catch(err => {
      //console.log("Error in fetching available hipbar deliveries", err)
      failureCallback()
    })
}

export function fetchCities() {
  return POST({
    api: "/city/availableCities",
    handleError: true,
    apiBase: "loki",
    data: {
      available: true,
      delivery_available: false,
      wallet_available: false
    }
  })
    .then(json => json.availableCities)
}

export function fetchBrandsUsingGenre(req) {
  return POST({
    api: `/consumer/browse/genres/${req.city}/${req.genre}`,
    handleError: true,
    apiBase: "catman",
    data: {
      from: req.offset,
      size: req.limit,
      is_featured: false
    }
  })
    .then(json => json)
}

export function fetchGenres(req) {
  return GET({
    api: `/consumer/browse/genres/${req.city}`,
    handleError: true,
    apiBase: "catman"
  })
    .then(json => json.data)
}

export function fetchSKUUsingBrand(req) {
  return POST({
    api: `/consumer/browse/stores/${req.genreShortName}/${req.brandName}`,
    handleError: true,
    apiBase: "catman",
    data: {
      from: 0,
      size: 9999,
      km: "40km",
      gps: "",
      is_featured: false,
      stateName: "KA"
    }
  })
    .then(json => json)
}