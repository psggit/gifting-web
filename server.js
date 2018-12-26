const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const React = require("react")
const { renderToNodeStream } = require("react-dom/server")
// const template = require("./src/template")

app.disable("x-powered-by")

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

// app.use(express.static(path.join(__dirname, "dist")))


app.listen(8080, () => {
  console.log("Server is running on port 8080\n")
})