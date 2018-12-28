const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const React = require("react")
const { renderToNodeStream, renderToString } = require("react-dom/server")
const bodyParser = require('body-parser')
const FormData = require("form-data")
const request = require("request")
const CheckoutReact = require("./dist-ssr/checkout").default

// 
app.disable("x-powered-by")

// ENV variables
// const PROD_API_BASE = process.env.PROD_API_BASE
const URL_ENV = "amebae21.hasura-app.io";
// const URL_ENV = process.env.URL_ENV


// middleware for processing js files
app.get("*.js", (req, res, next) => {
  console.log("Processing js files....")
  console.log("Gzipping....")
  // req.url += ".br"
  // res.set("Content-Encoding", "br")
  // res.set("Content-type", "text/javascript")
  const vendorUrlRegex = /vendor.*.js/
  if (vendorUrlRegex.test(req.url)) {
    console.log("Setting cache for vendor....")
    res.setHeader("Cache-Control", "private, max-age=31536000")
  }
  next()
})

app.use(express.static(path.join(__dirname, "dist")))
app.use(bodyParser.urlencoded({ extended: true }))

// app.get("/checkout", (req, res) => {
//   res.send("Not Found")
// })

// app.post('/checkout', (req, res) => {
//   const { preloadedState, content}  = CheckoutReact.default(req.body)
//   const response = template("Server Rendered Page", preloadedState, content)
//   res.setHeader('Cache-Control', 'assets, max-age=604800')
//   res.send(response)
// })


// app.post("/checkout", (req, res,) => {  

//   const html = fs.readFileSync("./dist/checkout.html", "utf-8")
//   const [head, tail] = html.split("{content}")
//   res.write(head)
//   console.log(req.body)
//   const reactElement = React.createElement(CheckoutReact, req.body)
//   // const html = renderToString(reactElement)
//   // res.send(html)
//   const stream = renderToNodeStream(reactElement)
//   stream.pipe(res, { end: false })
//   stream.on("end", () => {
//     res.write(tail)
//     res.end()
//   })
// })

// app.get("/*", (req, res,) => {  
//   const html = fs.readFileSync("./dist/index.html", "utf-8")
//   const [head, tail] = html.split("{content}")
//   res.write(head)
//   const reactElement = React.createElement('div', null, `Hello World`)
//   const stream = renderToNodeStream(reactElement)
//   stream.pipe(res, { end: false })
//   stream.on("end", () => {
//     res.write(tail)
//     res.end()
//   })
// })

// client side app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.post("/transaction", (req, res) => {
  request.post({ url: `https://orderman.${URL_ENV}/consumer/payment/gift/finalize`, form: req.body }, (err, httpRes, body) => {
    console.log(err, httpRes, body)
  })
  res.sendFile(path.join(__dirname, "src/transaction.html"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.use(express.static(path.join(__dirname, "dist")))


app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})