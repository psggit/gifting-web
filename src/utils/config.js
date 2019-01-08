
function getAPIObj() {
  // console.log(BASE_URL)
  const baseHost = "amebae21.hasura-app.io"

  return {
    authUrl: "https://auth." + baseHost,
    blogicUrl: "https://api1." + baseHost,
    orderman: "https://orderman." + baseHost,
    catman: "https://catman." + baseHost,
    loki: "https://loki." + baseHost
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
