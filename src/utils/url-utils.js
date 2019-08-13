export function getQueryParamByName(name, query = location.search.slice(1)) {
  const queryObj = query.split("&").reduce((a, b) => {
    if (b.split("=")[1] == 'true' || b.split("=")[1] == 'false') {
      a[b.split("=")[0]] = JSON.parse(b.split("=")[1])
    } else {
      a[b.split("=")[0]] = b.split("=")[1]
    }
    return a
  }, {})

  return queryObj[name]
}

export function getQueryUri(queryObj) {
  console.log("query obj", queryObj, Object.entries(queryObj).map(obj => obj.join('=')).join('&'))
  const queryUri = Object.entries(queryObj).map(obj => obj.join('=')).join('&')
  return "?" + queryUri
}