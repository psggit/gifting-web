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

// Static pages
const LandingPage = require("../dist-ssr/landing").default
const AgeGate = require("../dist-ssr/age_gate").default
const GetStartedPage = require("../dist-ssr/send_gift").default
const RedeemGiftCard = require("../dist-ssr/redeem_gift_card").default
const RetailOutlet = require("../dist-ssr/retail_outlet").default
const FAQ = require("../dist-ssr/faq").default

//HTML Templates
const ProductListingHTML = fs.readFileSync(path.resolve(__dirname, "../dist/product-listing.html"), "utf-8")

const getMetaTags = require("./meta-tags")
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
  noSniff: false
}))

// ENV variables
// const PROD_API_BASE = process.env.PROD_API_BASE
// const BASE_URL = "amebae21.hasura-app.io";
const BASE_URL = process.env.BASE_URL || "amebae21.hasura-app.io"

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `./../images/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.use(express.static(path.join(__dirname, "dist")))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/privacy.html`), (err) => {
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
  request.post({ url: `https://orderman.${BASE_URL}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    console.log(httpRes)
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
  res.sendFile(path.join(__dirname, "./../manifest.json"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/grievance-policy", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/grievance-policy.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/merchants-t-c", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/merchants-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-t-c", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/gifting-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/user-terms", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/user-terms.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/hipbar-wallet", (req, res) => {
  res.sendFile(path.join(__dirname, `./../html/hipbar-wallet.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

function renderStaticMarkup({component, req, res, file}) {
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/${file}.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  console.log(req.url)
  const headWithNavbar = withMetaTags(withHeader(head), req.url, undefined, req.url)
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


function withTitle(head, title) {
  return head.split("{title}").join(title)
}

function withMetaTags(head, name, extraKeyWord, url) {
  const meta = getMetaTags(name, extraKeyWord)
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

app.get("/age-gate", (req, res) => {
  renderStaticMarkup({
    component: AgeGate,
    req,
    res, 
    file: "age-gate",
    pageName: "age-gate"
  })
})

app.get("/", (req, res) => {
  renderStaticMarkup({
    component: LandingPage, 
    req,
    res, 
    file: "landing",
  })
})

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

app.get("/brands/:citySlug/:genreSlug/", (req, res) => {
  const city = capitalize(req.params.citySlug)
  const genre = req.params.genreSlug

  const url = `https://catman.${BASE_URL}/consumer/browse/genres/${city}/${genre}`
  const options = {
    method: "post",
    body: {
      from: 0,
      size: 11
    },
    json: true,
    url
  }

  request(options, (err, httpRes, body) => {
    const [head, tail] = ProductListingHTML.split("{content}")
    const headWithNavbar = withHeader(head)
    res.write(withMetaTags(headWithNavbar, `/${city.toLowerCase()}/${genre}`, undefined, req.url))

    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr_script">
        window.__isMobile__ = ${JSON.stringify(isMobile(req))}
        window.__active_city__ = ${JSON.stringify(city)}
        window.__active_genre__ = ${JSON.stringify(genre)}
        window.__BRANDS__ = ${JSON.stringify(body)}
      </script>
      `)


    const reactElement = React.createElement(BrandListingPage, {
      brands: body,
      activeGenre: genre,
      activeCity: city,
      isMobile: isMobile(req)
    })
    const stream = renderToNodeStream(reactElement)
    stream.pipe(res, { end: false })
    stream.on("end", () => {
      res.write(newTail)
      res.end()
    })
  })
})

app.get("/brands/:citySlug/:genreSlug/:brandSlug", (req, res) => {
  const city = capitalize(req.params.citySlug)
  const genre = req.params.genreSlug
  const brand = urlencode(req.params.brandSlug)

  request({
    method: "GET",
    url: `https://catman.${BASE_URL}/consumer/browse/stores/${city}/${genre}/${brand}`,
  }, (err, httpRes, body) => {
    const parsed = JSON.parse(body)
    const html = fs.readFileSync(path.resolve(__dirname, "./../dist/product-detail.html"), "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withHeader(head)
    res.write(withMetaTags(headWithNavbar, `/${city.toLowerCase()}/${genre}`, parsed.brand.brand_name, req.url))

    const newTail = tail.split("{script}")
      .join(`
      <script>
        window.__isMobile__ = ${JSON.stringify(isMobile(req))}
        window.__active_city__ = ${JSON.stringify(city)}
        window.__active_genre__ = ${JSON.stringify(genre)}
        window.BRAND_STATE = ${JSON.stringify(parsed.brand)}
      </script>
      `)


    const reactElement = React.createElement(BrandDetailPage, { brand: parsed.brand })
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
  const html = fs.readFileSync(path.resolve(__dirname, "./../dist/client.html"), "utf-8")
  const [head, tail] = html.split("{content}")
  const headWithNavbar = withHeader(head)
  res.write(headWithNavbar)
  res.end()
})


app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})