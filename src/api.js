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
    api: `/consumer/browse/web/genres/${req.city}/${req.genre}`,
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
    api: `/consumer/browse/web/genres/${req.city}`,
    handleError: true,
    apiBase: "catman"
  })
    .then(json => json.data)
}

export function fetchSKUUsingBrand(req) {
  return GET({
    api: `/consumer/browse/stores/${req.cityName}/${req.genreShortName}/${req.brandShortName}`,
    handleError: true,
    apiBase: "catman"
  })
    .then(json => json)
}

export function fetchCoupons(req) {
  return POST({
    api: "/consumer/listCoupons",
    handleError: true,
    apiBase: "promoman",
    data: {
      order_type: "gifting_sku",
      gps: req.gps
    }
  })
    .then(json => json.data)
}

export function fetchGiftCardSummary(req){ 
  return POST({
    api: "/consumer/gift_card/summary",
    handleError: true,
    apiBase: "orderman",
    data: req
  })
    .then(json => json)
}