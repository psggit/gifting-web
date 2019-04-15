
function getAPIObj() {
  // console.log(BASE_URL)
  const baseHost = process.env.BASE_URL

  return {
    authUrl: "https://auth." + baseHost,
    blogicUrl: "https://api1." + baseHost,
    orderman: "https://orderman." + baseHost,
    catman: "https://catman." + baseHost,
    loki: "https://loki." + baseHost,
    promoman: "https://promoman." + baseHost,
    stockandprice: "https://stockandprice." + baseHost + "/Api/stockandprice"
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
