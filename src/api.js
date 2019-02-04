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

export function fetchCities(CB) {
  POST({
    api: "/city/availableCities",
    handleError: true,
    apiBase: "loki",
    data: {
      available: true,
      delivery_available: false,
      wallet_available: false
    }
  })
    .then(json => {
      CB(json.availableCities)
    })
}

export function fetchBrandsUsingGenre(req, CB) {
  POST({
    api: `/consumer/browse/genre/${req.genre.shortName}`,
    handleError: true,
    apiBase: "catman",
    data: {
      from: req.offset,
      size: req.limit,
      km: "40km",
      gps: req.gps,
      is_featured: false,
      stateName: req.state_short_name
    }
  })
    .then(json => {
      CB(json)
    })
}

export function fetchGenres(gps, CB) {
  POST({
    api: "/consumer/browse/stores/",
    handleError: true,
    apiBase: "catman",
    data: {
      gps
    }
  })
    .then(json => {
      CB(json.data, false)
    })
}

export function fetchSKUUsingBrand(genreShortName, brandName, CB) {
  POST({
    api: `/support/browse/stores/${genreShortName}/${brandName}`,
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
    .then(json => {
      let id
      let type
      let cashbackTitle
      const skus = json.brand.skus.map(item => {
        id = item.offer ? item.offer.cash_back_offer_id : item.sku_pricing_id
        type = item.offer ? "cashback" : "normal"
        cashbackTitle = item.offer ? item.offer.title : ""
        return {
          id,
          volume: item.volume,
          price: item.price,
          type,
          cashbackTitle
        }
      })
      CB(skus, false)
    })
}