import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

export function unMountModal() {
  document.body.style = "overflow:auto"
  unmountComponentAtNode(document.getElementById('confirm-modal'))
}

export function mountModal(Component) {
  document.body.style = "overflow:hidden"
  render(
    <Component />, document.getElementById('confirm-modal')
  )
}
