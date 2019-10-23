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
const BASE_URL = process.env.BASE_URL || "hipbar-dev.com"

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

app.get("/", (req, res) => {
  // console.log("home")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/home", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-guide-alcohol", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-guide-alcohol/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-alcohol-occasions", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/gifting-alcohol-occasions/index.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/alcohol-gifting-redeem-gift-cards", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/alcohol-gifting-redeem-gift-cards/index.html`), (err) => {
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

app.get("/alcohol-gifting-support-and-faqs", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../wp-static-files/alcohol-gifting-support-and-faqs/index.html`), (err) => {
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

// app.get("/privacy/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/privacy-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

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
    const headWithNavbar = withHeader(head)
    res.write(headWithNavbar)

    const txn = {
      net_amount_debit: req.body.net_amount_debit,
      cardnum: req.body.cardnum,
      mode: req.body.mode,
      txnid: req.body.txnid,
      addedon: req.body.addedon
    }

    const newTail = tail.split("{script}")
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
    const headWithNavbar = withHeader(head)
    res.write(headWithNavbar)
    const newTail = tail.split("{script}")
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
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  request.post({ url: `https://orderman.${BASE_URL}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/transaction-failed.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withHeader(head)
    res.write(headWithNavbar)
    const newTail = tail.split("{script}")
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

// app.get("/grievance-policy/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/grievance-policy-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

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

// app.get("/merchants-t-c/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/merchants-t-c-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

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

// app.get("/gifting-t-c/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/gifting-t-c-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

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

// app.get("/user-terms/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/user-terms-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.get("/hipbar-wallet", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  res.sendFile(path.join(__dirname, `./../html/hipbar-wallet.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.get("/hipbar-wallet/tamil", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
//   res.sendFile(path.join(__dirname, `./../html/hipbar-wallet-tamil.html`), (err) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

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
  res.write(headWithNavbar)
  const reactElement = React.createElement(component)
  const stream = renderToNodeStream(reactElement)
  stream.pipe(res, { end: false })
  stream.on("end", () => {
    res.write(tail)
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
  console.log(req.params.name)
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

app.get("/brand/:stateSlug/:genreSlug/:brandSlug", (req, res) => {
  res.set("Content-type", "text/html")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, private")
  const state = req.params.stateSlug
  const genre = req.params.genreSlug
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
    res.write(withMetaTags(headWithNavbar, genreName, req.url))

    const newTail = tail.split("{script}")
      .join(`
      <script>
        window.__isMobile__ = ${isMobile(req)}
        window.__active_city__ = ${state}
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
  const headWithNavbar = withHeader(head)
  res.write(headWithNavbar)
  res.end()
})

app.listen(8080, () => {
  console.log("Server is running on the port 8080\n")
})
