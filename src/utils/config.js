
function getAPIObj() {
  let scheme = "https"
  let baseHost = ".amebae21.hasura-app.io"
  let appName = "amebae21"
  return {
    authUrl: "https://auth." + appName + ".hasura-app.io",
    blogicUrl: "https://api1." + appName + ".hasura-app.io",
    orderman: scheme + "://orderman" + baseHost,
    catman: scheme + "://catman" + baseHost,
    loki: scheme + "://loki" + baseHost
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
