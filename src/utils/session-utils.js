import { local } from "store2"

export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
  // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
  const rolesMap = {
    admin: 8,
    opadmin: 8,
    dataadmin: 7,
    opdataadmin: 7,
    dataentry: 6,
    opdataentry: 6,
    support_admin: 5,
    support_master: 4,
    support_person: 3,
    business_team: 9,
    product_team: 5,
    delivery_support_person: 3,
    user: 1
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for(let i=0; i<hasuraRoles.length; i++) {
    if (maxRole <= rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

// export function getAuthToken(data) {
//   const token = data.auth_token
//   return token
// }

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

export function getUsername(data) {
  //console.log("data", data)
  const username = data.info.username ? data.info.username : "" 
  return username
}

export function getSenderMobileNumber(data) {
  const sender_mobile = data.sender_mobile ? data.sender_mobile : "" 
  return sender_mobile
}

export function createSession(data) {
  console.log("session storage", data)
  localStorage.setItem("x-hasura-role", getHasuraRole(data))
  localStorage.setItem("hasura-id", getHasuraId(data))
  localStorage.setItem("username", getUsername(data))
  localStorage.setItem("sender_mobile", getSenderMobileNumber(data))
  //localStorage.setItem("isLoggedIn", loginStatus)
}

export function saveUserData(data) {
  localStorage.setItem("senderInfo", JSON.stringify(data))
}

export function clearSession() {
  localStorage.removeItem("x-hasura-role")
  localStorage.removeItem("hasura-id")
  localStorage.removeItem("username")
  localStorage.removeItem("promo_code")
  localStorage.removeItem("sender_mobile")
}

export function  readCookie(name) {
  var nameEQ = name + "="
  var ca = document.cookie.split(";")
  for(var i=0;i < ca.length;i++) {
    var c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1,c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length,c.length)
    }
  }
  return null
}


export function getCookie(tabs) {
  var getting = browser.cookies.get({
    url: tabs[0].url,
    name: "favourite-colour"
  })
  getting.then(logCookie)
}