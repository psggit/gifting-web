const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const React = require("react")
const { renderToNodeStream, renderToString } = require("react-dom/server")
const bodyParser = require("body-parser")
const request = require("request")
const urlencode = require("urlencode")

const TransactionSuccess = require("./dist-ssr/transaction_success").default
const TransactionFailure = require("./dist-ssr/transaction_failure").default
const BrandDetailPage = require("./dist-ssr/brand_detail").default
const BrandListingPage = require("./dist-ssr/brand_listing").default
const Header = require("./dist-ssr/header").default

// Static pages
const LandingPage = require("./dist-ssr/landing").default
const AgeGate = require("./dist-ssr/age_gate").default
const GetStartedPage = require("./dist-ssr/send_gift").default
const RedeemGiftCard = require("./dist-ssr/redeem_gift_card").default
const RetailOutlet = require("./dist-ssr/retail_outlet").default
const FAQ = require("./dist-ssr/faq").default

function capitalize(str) {
  return `${str.split("")[0].toUpperCase()}${str.slice(1)}`
}

function isMobile(req) {
  const userAgent = req.get("User-Agent")
  const userAgentRegex = /Mobile|iPhone|Android|BlackBerry|IEMobile/
  return userAgentRegex.test(userAgent)
}

app.disable("x-powered-by")

// ENV variables
// const PROD_API_BASE = process.env.PROD_API_BASE
// const BASE_URL = "amebae21.hasura-app.io";
const BASE_URL = process.env.BASE_URL || "amebae21.hasura-app.io"

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `images/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.use(express.static(path.join(__dirname, "dist")))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, `src/privacy.html`), (err) => {
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
    const html = fs.readFileSync("./dist/transaction-success.html", "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withHeader(head)
    res.write(headWithNavbar)
 
    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__TXN__ = ${JSON.stringify(req.body)}
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
    const html = fs.readFileSync("./dist/transaction-failed.html", "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withHeader(head)
    res.write(headWithNavbar)
    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__TXN__ = ${JSON.stringify(req.body)}
      </script>
      `)

    const reactElement = React.createElement(TransactionFailure, { res: req.body })
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
    const html = fs.readFileSync("./dist/transaction-failed.html", "utf-8")
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
  res.sendFile(path.join(__dirname, "manifest.json"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/grievance-policy", (req, res) => {
  res.sendFile(path.join(__dirname, `src/grievance-policy.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/merchants-t-c", (req, res) => {
  res.sendFile(path.join(__dirname, `src/merchants-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/gifting-t-c", (req, res) => {
  res.sendFile(path.join(__dirname, `src/gifting-t-c.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/user-terms", (req, res) => {
  res.sendFile(path.join(__dirname, `src/user-terms.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get("/hipbar-wallet", (req, res) => {
  res.sendFile(path.join(__dirname, `src/hipbar-wallet.html`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

function renderStaticMarkup(component, req, res, file) {
  const html = fs.readFileSync(`./dist/${file}.html`, "utf-8")
  const [head, tail] = html.split("{content}")
  const headWithNavbar = withHeader(head)
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

app.get("/age-gate", (req, res) => {
  renderStaticMarkup(AgeGate, req, res, "age-gate")
})

app.get("/", (req, res) => {
  renderStaticMarkup(LandingPage, req, res, "landing")
})

app.get("/send-gift", (req, res) => {
  renderStaticMarkup(GetStartedPage, req, res, "ssr")
})

app.get("/how-to-redeem", (req, res) => {
  renderStaticMarkup(RedeemGiftCard, req, res, "ssr")
})

app.get("/retail-outlet", (req, res) => {
  renderStaticMarkup(RetailOutlet, req, res, "ssr")
})

app.get("/FAQs", (req, res) => {
  renderStaticMarkup(FAQ, req, res, "ssr")
})

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"), (err) => {
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
    const html = fs.readFileSync("./dist/product-listing.html", "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withTitle(withHeader(head), `Gift your friends ${genre} in ${city}`)
    res.write(headWithNavbar)

    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr_script">
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
  console.log(brand)

  request({
    method: "GET",
    url: `https://catman.${BASE_URL}/consumer/browse/stores/${city}/${genre}/${brand}`,
  }, (err, httpRes, body) => {
    const parsed = JSON.parse(body)
    console.log(parsed)
    const html = fs.readFileSync("./dist/product-detail.html", "utf-8")
    const [head, tail] = html.split("{content}")
    const headWithNavbar = withTitle(withHeader(head), `Hipbar Gifting | ${parsed.brand.brand_name}`)
    res.write(headWithNavbar)

    const newTail = tail.split("{script}")
      .join(`
      <script>
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

app.use(express.static(path.join(__dirname, "dist")))

// client side app
app.get("/*", (req, res) => {
  const html = fs.readFileSync("./dist/index.html", "utf-8")
  const [head, tail] = html.split("{content}")
  const headWithNavbar = withHeader(head)
  res.write(headWithNavbar)
  res.end()
})


app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})