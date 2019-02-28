const goa = require("./city-meta-tags/goa")
const mahe = require("./city-meta-tags/mahe")
const chennai = require("./city-meta-tags/chennai")

const defaultMetaTags = {
  title: "",
  description: "",
  keywords: ""
}

const pageMetaTags = {
  "/age-gate": {
    title: "",
    description: "",
    keywords: ""
  },

  "/": {
    title: "HipBar Gifting - Gift your friends drinks online!",
    description: "Gift your friends their favourite drinks - Beers, Whiskys, Vodkas & More! Send gift cards online to celebrate all occasions and say 'Cheers' in style. Use HipBar Gifting today!",
    keywords: "Gifts Online, Gifting in India, Alcohol Online, Drinks Online, Hipbar"
  },

  "/send-gift": {
    title: "HipBar Gifting - Gift your friends drinks online!",
    description: "",
    keywords: ""
  },

  "/how-to-redeem": {
    title: "HipBar Gifting - Gift your friends drinks online!",
    description: "Redeem your drink gifts cards by downloading HipBar App. 4 Easy Steps to Redeem Your Drink Gift Cards! Download HipBar App Now!",
    keywords: "Redeem gift cards, Hipbar, Hipbar Gifting"
  },

  "/retail-outlet": {
    title: "",
    description: "",
    keywords: ""
  },

  "/FAQs": {
    title: "HipBar Gifting - Gift your friends drinks online!",
    description: "HipBar Gifting - FAQs for gifting online",
    keywords: ""
  }
}

function getMetaTags(name, extraKeyWord) {
  console.log("keyword", extraKeyWord)
  const metaTags = { ...goa, ...mahe, ...chennai, ...pageMetaTags}
  if (extraKeyWord && metaTags[name]) {
    metaTags[name].keywords = metaTags[name].keywords.concat(`, ${extraKeyWord}`)
  }
  return metaTags[name] || defaultMetaTags
}


module.exports = getMetaTags