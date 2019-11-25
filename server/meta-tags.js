// const goa = require("./city-meta-tags/goa")
// const mahe = require("./city-meta-tags/mahe")
// const chennai = require("./city-meta-tags/chennai")
const getGenreMetaTag = require("./genre-meta-tags")

const defaultMetaTags = {
  title: "",
  description: "",
  keywords: ""
}

const pageMetaTags = {
  "/age-gate": {
    title: "HipBar Gifting - Check Your Legal Age for Gifting Drinks in India",
    description: "Get to check the legal age limit for gifting drinks in India",
    url: "/age-gate",
    site_name: "HipBar",
    keywords: ""
  },

  "/": {
    title: "HipBar Gifting - Gift your friends their favourite whisky, beer, &amp; more online!",
    description: "Gift your friends their favourite drinks - Beers, Whiskys, Vodkas & More! Send gift cards online to celebrate all occasions and say 'Cheers' in style. Use HipBar Gifting today!",
    url: "/",
    site_name: "HipBar",
    keywords: "Gifts Online, Gifting in India, Alcohol Online, Drinks Online, Hipbar"
  },

  "/send-gift": {
    title: "HipBar Gifting - Gift your friends their favourite drinks online",
    description: "Explore HipBar’s gamut of drinks, across beer, whisky, rum, and more for all occasions. Gift Drinks Now!",
    url: "/send-gift",
    site_name: "HipBar",
    keywords: ""
  },

  "/how-to-redeem": {
    title: "HipBar Gifting - Redeem Your Drinks Now",
    description: "Redeem your drink gifts cards by downloading HipBar App. 4 Easy Steps to Redeem Your Drink Gift Cards! Download HipBar App Now!",
    url: "/how-to-redeem",
    site_name: "HipBar",
    keywords: "Redeem gift cards, Hipbar, Hipbar Gifting"
  },

  "/retail-outlet": {
    title: "HipBar Gifting - Find Retailers Near You",
    description: "Locate HipBar powered retailers near you to redeem your drink(s) now! Download HipBar App & Locate Retailers Now!",
    url: "/retail-outlet",
    site_name: "HipBar",
    keywords: ""
  },

  "/FAQs": {
    title: "HipBar - Need help in gifting a drink? ",
    description: "Need help with gifting a drink? Let us prepare you a cocktail solution for your great times - HipBar Gifting Help with Support & FAQs!",
    url: "/FAQs",
    site_name: "HipBar",
    keywords: ""
  }
}

function getMetaTags(name) {
  const genreMetaTags = getGenreMetaTag(name)
  const metaTags = { ...genreMetaTags, ...pageMetaTags}
  return metaTags[name] || defaultMetaTags
}


module.exports = getMetaTags