const express = require("express")
const path = require("path")
const app = express()
// const template = require("./src/template")

app.disable("x-powered-by")

// middleware for processing js files
app.get("*.js", (req, res, next) => {
  console.log("Processing js files....")
  const vendorUrlRegex = /vendor.*.js/
  if (vendorUrlRegex.test(req.url)) {
    console.log("Setting cache for vendor....")
    res.setHeader("Cache-Control", "private, max-age=31536000")
  }
  next()
})

app.use("/", express.static(path.join(__dirname, "dist")))

// app.get("/", (req, res) => {
//   const landingPageHTML = LandingTemplate("Server rendered page")
//   res.send(landingPageHTML)
// })

// client side app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})