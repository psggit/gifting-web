const express = require("express")
const path = require("path")
const app = express()
const helmet = require("helmet")
const fs = require("fs")
const React = require("react")
const { renderToNodeStream, renderToString } = require("react-dom/server")
const bodyParser = require("body-parser")
const request = require("request")
const urlencode = require("urlencode")

const TransactionSuccess = require("../dist-ssr/transaction_success").default
const TransactionFailure = require("../dist-ssr/transaction_failure").default
const BrandDetailPage = require("../dist-ssr/brand_detail").default
const BrandListingPage = require("../dist-ssr/brand_listing").default
const Header = require("../dist-ssr/header").default
const HeaderWithoutSignin = require("../dist-ssr/headerWithoutSignin").default

// Static pages
const LandingPage = require("../dist-ssr/landing").default
const AgeGate = require("../dist-ssr/age_gate").default
const ServiceableCities = require("../dist-ssr/cities-serviceable").default
const LegaDrinkingAge = require("../dist-ssr/legal_drinking_age").default
const GetStartedPage = require("../dist-ssr/send_gift").default
const RedeemGiftCard = require("../dist-ssr/redeem_gift_card").default
const RetailOutlet = require("../dist-ssr/retail_outlet").default
const FAQ = require("../dist-ssr/faq").default

//HTML Templates
const ProductListingHTML = fs.readFileSync(path.resolve(__dirname, "../dist/product-listing.html"), "utf-8")

const getMetaTags = require("./meta-tags")
const getGenreNameById = require("./utils")
// const PageWiseMetaTags = require("./page-wise-meta-tags")

function capitalize(str) {
  return `${str.split("")[0].toUpperCase()}${str.slice(1)}`
}

function isMobile(req) {
  const userAgent = req.get("User-Agent")
  const userAgentRegex = /Mobile|iPhone|Android|BlackBerry|IEMobile/
  return userAgentRegex.test(userAgent)
}

app.use(helmet({
  frameguard: {
    action: "deny"
  }
}))

// ENV variables
// const PROD_API_BASE = process.env.PROD_API_BASE
// const BASE_URL = "amebae21.hasura-app.io";
const firebaseConfig = {
  apiKey: "AIzaSyBPcX0dh8EdPg4qyoa9vbIwTkSgvoKyxuw",
  authDomain: "gifting-site-dev.firebaseapp.com",
  databaseURL: "https://gifting-site-dev.firebaseio.com",
  projectId: "gifting-site-dev",
  storageBucket: "gifting-site-dev.appspot.com",
  messagingSenderId: "675341753434",
  appId: "1:675341753434:web:ca94f6b2566337c75ecc63",
  measurementId: "G-QY3C3KV5DT"
}

const BASE_URL = process.env.BASE_URL || "hipbar-dev.com"
const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID || "GTM-T5C9JFG"
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || firebaseConfig
console.log("firebase config", FIREBASE_CONFIG)

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../images/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-includes/js/jquery/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-includes/js/jquery/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-includes/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-includes/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-includes/svg/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-includes/svg/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-includes/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-includes/images/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-includes/fonts/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-includes/fonts/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/animate-it/assets/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/animate-it/assets/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/animate-it/assets/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/animate-it/assets/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/animate-it/assets/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/animate-it/assets/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/contact-form-7/includes/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/contact-form-7/includes/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/post-grid-and-filter-ultimate/assets/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/post-grid-and-filter-ultimate/assets/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/contact-form-7/includes/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/contact-form-7/includes/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/post-grid-and-filter-ultimate/assets/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/post-grid-and-filter-ultimate/assets/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/siteorigin-panels/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/siteorigin-panels/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/siteorigin-panels/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/siteorigin-panels/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/shortcodes-ultimate/assets/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/shortcodes-ultimate/assets/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/shortcodes-ultimate/includes/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/shortcodes-ultimate/includes/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/js/owl-slider/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/sliderspack-all-in-one-image-sliders/assets/js/owl-slider/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/plugins/so-widgets-bundle/widgets/button/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/plugins/so-widgets-bundle/widgets/button/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/js/bxslider/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/js/bxslider/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/js/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/js/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/css/faw/css/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/css/faw/css/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/themes/hipbar/css/faw/fonts/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/themes/hipbar/css/faw/fonts/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/uploads/siteorigin-widgets/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/uploads/siteorigin-widgets/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/uploads/2019/07/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/uploads/2019/07/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/wp-content/uploads/2019/08/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../wp-static-files/wp-content/uploads/2019/08/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.use(express.static(path.join(__dirname, "dist")))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/sw.js", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, "./../sw.js"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-drinks", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/our-network", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/available-stores/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-guide-for-drinks", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-guide-for-drinks/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-drinks-for-occasions", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-drinks-for-occasions/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-drinks-redeem-gift-cards", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-drinks-redeem-gift-cards/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/our-network-for-gifting-drinks", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/available-stores/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-drinks-support-and-faqs", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-drinks-support-and-faqs/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/privacy", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/privacy.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/privacy/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/privacy-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/privacy/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/privacy-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/transaction-successful", (req, res) => {
  res.send("Not found")
})

app.get("/transaction-failure", (req, res) => {
  res.send("Not found")
})

app.get("/transaction-cancelled", (req, res) => {
  res.send("Not found")
})

app.post("/transaction-successful", (req, res) => {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  request.post({ url: `https://orderman.${BASE_URL}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/transaction-success.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    // const headWithNavbar = withHeader(head)
    // res.write(headWithNavbar)
    const headWithNavbar = withHeader(head)
    const headerWithFacebookPixelCode = withFacebookPixelCode(headWithNavbar) 
    const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
    const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
    const tailWithGamoogaScript = getGamoogaScript(tail)
    res.write(headWithGtmScriptPart2)

    const txn = {
      net_amount_debit: req.body.net_amount_debit,
      cardnum: req.body.cardnum,
      mode: req.body.mode,
      txnid: req.body.txnid,
      addedon: req.body.addedon
    }

    const newTail = tailWithGamoogaScript.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__TXN__ = ${JSON.stringify(txn)}
      </script>
      `)
    const reactElement = React.createElement(TransactionSuccess)
    // console.log(renderToString(reactElement))
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
  // const reactHTML = renderToString(reactElement)
  // res.send(reactHTML)
})

app.post("/transaction-cancelled", (req, res) => {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  request.post({ url: `https://orderman.${BASE_URL}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/transaction-failed.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    // const headWithNavbar = withHeader(head)
    // res.write(headWithNavbar)
    const headWithNavbar = withHeader(head)
    const headerWithFacebookPixelCode = withFacebookPixelCode(headWithNavbar) 
    const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
    const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
    const tailWithGamoogaScript = getGamoogaScript(tail)
    res.write(headWithGtmScriptPart2)
    const newTail = tailWithGamoogaScript.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__TXN__ = ${JSON.stringify(req.body)}
      </script>
      `)

    const reactElement = React.createElement(TransactionFailure)
    // console.log(renderToString(reactElement))
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
  // const reactHTML = renderToString(reactElement)
  // res.send(reactHTML)
})

app.post("/transaction-failure", (req, res) => {
  res.set("Content-type", "text/html")
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, private")
  request.post({ url: `https://orderman.${BASE_URL}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/transaction-failed.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    // const headWithNavbar = withHeader(head)
    // res.write(headWithNavbar)
    const headWithNavbar = withHeader(head)
    const headerWithFacebookPixelCode = withFacebookPixelCode(headWithNavbar) 
    const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
    const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
    const tailWithGamoogaScript = getGamoogaScript(tail)
    res.write(headWithGtmScriptPart2)
    const newTail = tailWithGamoogaScript.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__TXN__ = ${JSON.stringify(req.body)}
      </script>
      `)

    const reactElement = React.createElement(TransactionFailure)
    // console.log(renderToString(reactElement))
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
  // const reactHTML = renderToString(reactElement)
  // res.send(reactHTML)
})

app.get("/manifest.json", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, "./../manifest.json"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/grievance-policy", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/grievance-policy.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/grievance-policy/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/grievance-policy-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/grievance-policy/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/grievance-policy-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/merchants-t-c", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/merchants-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/merchants-t-c/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/merchants-t-c-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/merchants-t-c/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/merchants-t-c-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-t-c", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/gifting-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-t-c/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/gifting-t-c-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-t-c/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/gifting-t-c-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/user-terms", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/user-terms.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/user-terms/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/user-terms-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/user-terms/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/user-terms-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/hipbar-wallet", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/hipbar-wallet.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/hipbar-wallet/tamil", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/hipbar-wallet-tamil.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/hipbar-wallet/hindi", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/hipbar-wallet-hindi.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

function renderStaticMarkup({ component, req, res, file }) {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/${file}.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  const headWithNavbar = withMetaTags(withHeader(head), req.url, req.url)
  const headerWithFacebookPixelCode = withFacebookPixelCode(headWithNavbar) 
  const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
  const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
  const tailWithGamoogaScript = getGamoogaScript(tail)
  res.write(headWithGtmScriptPart2)
  const reactElement = React.createElement(component)
  const stream = renderToNodeStream(reactElement)
  stream.pipe(res, { end: false })
  stream.on("end", () => {
    res.write(tailWithGamoogaScript)
    res.end()
  })
}

function renderLegalDrinkingAgeMarkUp({ component, req, res, file }) {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/${file}.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  const headWithNavbar = withMetaTags(headerWithoutSignIn(head), req.url, undefined, req.url)
  res.write(headWithNavbar)
  const reactElement = React.createElement(component)
  const stream = renderToNodeStream(reactElement)
  stream.pipe(res, { end: false })
  stream.on("end", () => {
    res.write(tail)
    res.end()
  })
}

function withHeader(head) {
  return head.split("{header}").join(renderToString(React.createElement(Header)))
}

function headerWithoutSignIn(head) {
  return head.split("{header}").join(renderToString(React.createElement(HeaderWithoutSignin)))
}

function withMetaTags(head, name, url) {
  const meta = getMetaTags(name)
  const canonicalTag = `<link rel="canonical" href="https://gifting.hipbar.com${url}">`
  return head.split("{meta}").join(`
    <title>${meta.title}</title>
    ${canonicalTag}
    <meta name="keywords" content="${meta.keywords}">
    <meta name="description" content="${meta.description}">

    <meta content="en_US" property="og:locale">
    <meta content="website" property="og:type">
    <meta content="${meta.title}" property="og:title">
    <meta content="${meta.description}" property="og:description">
    <meta content="${meta.url}" property="og:url">
    <meta content="${meta.site_name}" property="og:site_name">
  `)
}

function withFacebookPixelCode (head) {
  return head.split("{facebookPixelCode}").join(`
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '747686785640043');
      fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=747686785640043&ev=PageView&noscript=1"
    /></noscript>
  `)
}

function getGtmScriptPart1 (head) {
  return head.split("{gtmScriptPart1}").join(`
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start':
            new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', "${GTM_CONTAINER_ID}");
    </script>
  `)
}

function getGtmScriptPart2 (head) {
  return head.split("{gtmScriptPart2}").join(`
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}" height="0" width="0"
        style="display:none;visibility:hidden"></iframe>
    </noscript>
  `)
}

function getGamoogaScript (tail) {
  return tail.split("{gamoogaScript}").join(`
    <script type="text/javascript">
      var _taq = { "id": "e848dae5-a4a9-41ad-8322-2d5092411a78", "events": [], "identify": [], "property": [], "handlers": [] };
      (function () {
        var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true; ta.id = "__ta";
        ta.src = '//cdn-jp.gsecondscreen.com/static/ta.min.js';
        var fs = document.getElementsByTagName('script')[0]; fs.parentNode.insertBefore(ta, fs);
      })();
    </script>
    <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js"></script>
   
    <script>
      //var firebaseConfig = ${FIREBASE_CONFIG}
      var firebaseConfig = {
        apiKey: "AIzaSyBPcX0dh8EdPg4qyoa9vbIwTkSgvoKyxuw",
        authDomain: "gifting-site-dev.firebaseapp.com",
        databaseURL: "https://gifting-site-dev.firebaseio.com",
        projectId: "gifting-site-dev",
        storageBucket: "gifting-site-dev.appspot.com",
        messagingSenderId: "675341753434",
        appId: "1:675341753434:web:ca94f6b2566337c75ecc63",
        measurementId: "G-QY3C3KV5DT"
      }
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey("BGbI11PFGFHrvV_YVfCuxgJAUQq08UK9MuBseOjPOl5f_0AaRAfolXQ6iSwcsKLjhJBPy1KD2jaVSRJP0Nl2_PM");
      messaging.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
    </script>
  `)
}

// function attachPageWiseMetaTags(head, pageName) {
//   return head.split("{meta}").join(`
//     <title>${PageWiseMetaTags[pageName].title}</title>
//     <meta name="keywords" content="${PageWiseMetaTags[pageName].keywords}">
//     <meta name="description" content="${PageWiseMetaTags[pageName].description}">
//   `)
// }

app.get('/fonts/:name', (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/fonts/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/age-gate", (req, res) => {
  renderStaticMarkup({
    component: AgeGate,
    req,
    res,
    file: "age-gate",
    pageName: "age-gate"
  })
})

app.get("/cities-serviceable", (req, res) => {
  renderStaticMarkup({
    component: ServiceableCities,
    req,
    res,
    file: "static"
  })
})

app.get("/legal-drinking-age", (req, res) => {
  renderLegalDrinkingAgeMarkUp({
    component: LegaDrinkingAge,
    req,
    res,
    file: "legal-drinking-age",
    pageName: "legal-drinking-age"
  })
})

// app.get("/", (req, res) => {
//   renderStaticMarkup({
//     component: LandingPage,
//     req,
//     res,
//     file: "landing",
//   })
// })

app.get("/send-gift", (req, res) => {
  renderStaticMarkup({
    component: GetStartedPage,
    req,
    res,
    file: "ssr"
  })
})

app.get("/how-to-redeem", (req, res) => {
  renderStaticMarkup({
    component: RedeemGiftCard,
    req,
    res,
    file: "static"
  })
})

app.get("/retail-outlet", (req, res) => {
  renderStaticMarkup({
    component: RetailOutlet,
    req,
    res,
    file: "static"
  })
})

app.get('*.pdf', (req, res) => {
  // const file = path.join(__dirname, `./../pdf/${req.url}`)
  //res.download(file)
  res.sendFile(path.join(__dirname, `./../pdf/${req.url}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/FAQs", (req, res) => {
  renderStaticMarkup({
    component: FAQ,
    req,
    res,
    file: "static"
  })
})

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "./../robots.txt"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "./../sitemap.xml"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.get("/brands/:stateSlug/:genreSlug/:citySlug", (req, res) => {
// res.set("Content-type", "text/html")
//   const state = req.params.stateSlug
//   const city = req.params.citySlug
//   const genre = req.params.genreSlug

//   const url = `https://retailer.${BASE_URL}/Api/stockandprice/listing/brands/${state}/${genre}`
//   const options = {
//     method: "post",
//     body: {
//       offset: 0,
//       limit: 11
//     },
//     json: true,
//     url
//   }

//   request(options, (err, httpRes, body) => {
//     const [head, tail] = ProductListingHTML.split("{content}")
//     const headWithNavbar = withHeader(head)
//     const genreName = getGenreNameById(genre)
//     res.write(withMetaTags(headWithNavbar, genreName, req.url))

//     const newTail = tail.split("{script}")
//       .join(`
//       <script id="ssr_script">
//         window.__isMobile__ = ${isMobile(req)}
//         window.__active_state__ = ${state}
//         window.__active_city__ = ${city}
//         window.__active_genre__ = ${genre}
//         window.__BRANDS__ = ${JSON.stringify(body.brands)}
//       </script>
//       `)
//     const reactElement = React.createElement(BrandListingPage, {
//       brands: body.brands,
//       activeGenre: genre,
//       activeState: state,
//       activeCity: city,
//       isMobile: isMobile(req)
//     })
//     const stream = renderToNodeStream(reactElement)
//     stream.pipe(res, { end: false })
//     stream.on("end", () => {
//       res.write(newTail)
//       res.end()
//     })
//   })
// })

app.get("/brand/:stateSlug/:genreSlug/:citySlug/:brandSlug", (req, res) => {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  const state = req.params.stateSlug
  const genre = req.params.genreSlug
  const city = req.params.citySlug
  // const brand = urlencode(req.params.brandSlug)
  const brand = req.params.brandSlug

  const url = `https://retailer.${BASE_URL}/Api/stockandprice/listing/branddetails/${state}/${genre}/${brand}`
  const options = {
    method: "post",
    body: {
      offset: 0,
      limit: 11
    },
    json: true,
    url
  }
  request(options, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/product-detail.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withHeader(head)
    const genreName = getGenreNameById(genre)
    //res.write(withMetaTags(headWithNavbar, genreName, req.url))
    const headWithMetaTag = withMetaTags(withHeader(headWithNavbar), genreName, req.url)
    const headerWithFacebookPixelCode = withFacebookPixelCode(headWithMetaTag) 
    const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
    const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
    const tailWithGamoogaScript = getGamoogaScript(tail)
    res.write(headWithGtmScriptPart2)
    const newTail = tailWithGamoogaScript.split("{script}")
      .join(`
      <script>
        window.__isMobile__ = ${isMobile(req)}
        window.__active_city__ = ${city}
        window.__active_state__ = ${state}
        window.__active_genre__ = ${genre}
        window.BRAND_STATE = ${JSON.stringify(body.brand_details)}
      </script>
      `)


    const reactElement = React.createElement(BrandDetailPage, { brand: body.brand_details })
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
})

// middleware for processing js files
app.get("*.js", (req, res, next) => {
  console.log("Processing js files....")
  console.log("Gzipping....")
  if (/app.*.js/.test(req.url) || /vendor.*.js/.test(req.url)) {
    req.url += ".gz"
    res.set("Content-Encoding", "gzip")
    res.set("Content-type", "text/javascript")
  }
  const vendorUrlRegex = /vendor.*.js/
  if (vendorUrlRegex.test(req.url)) {
    console.log("Setting cache for vendor....")
    res.setHeader("Cache-Control", "private, max-age=31536000")
  }
  next()
})

app.get("*.css", (req, res, next) => {
  console.log("Processing css files..")
  req.url += ".gz"
  res.set("Content-Encoding", "gzip")
  res.set("Content-type", "text/css")
  //res.end()
  next()
})

app.use(express.static(path.join(__dirname, "./../dist")))

// app.get("/personalise", (req, res) => {
//   const html = fs.readFileSync(path.resolve(__dirname, "./../dist/client.html"), "utf-8")
//   const [head, tail] = html.split("{content}")
//   const headWithNavbar = withHeader(head)
//   res.write(headWithNavbar)
//   res.end()
// })

// app.get("/basket", (req, res) => {
//   const html = fs.readFileSync(path.resolve(__dirname, "./../dist/client.html"), "utf-8")
//   const [head, tail] = html.split("{content}")
//   const headWithNavbar = withHeader(head)
//   res.write(headWithNavbar)
//   res.end()
// })

// client side app
app.get("/*", (req, res) => {
  // console.log("no match")
  if (!/.*.js/.test(req.url)) {
    res.set("Content-type", "text/html")
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  }
  const html = fs.readFileSync(path.resolve(__dirname, "./../dist/client.html"), "utf-8")
  const [head, tail] = html.split("{content}")
  // const headWithNavbar = withHeader(head)
  // res.write(headWithNavbar)
  const headWithNavbar = withHeader(head)
  const headerWithFacebookPixelCode = withFacebookPixelCode(headWithNavbar) 
  const headWithGtmScriptPart1 = getGtmScriptPart1(headerWithFacebookPixelCode)
  const headWithGtmScriptPart2 = getGtmScriptPart2(headWithGtmScriptPart1)
  const tailWithGamoogaScript = getGamoogaScript(tail)
  res.write(headWithGtmScriptPart2)
  res.write(tailWithGamoogaScript)
  res.end()
})

app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})
