var React = require('react')
var { renderToString } = require('react-dom/server')
var Component = require("../payment-status").default

function render(props) {
  return renderToString(<Component props={props} />)
}

export default render