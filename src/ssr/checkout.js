import React from 'react'
import { renderToString } from 'react-dom/server'
import App from "./../Payment/index"

export default function render() {
  // Configure the store with the initial state provided
  // const store = configureStore(initialState)

  // render the App store static markup ins content variable
  const content = renderToString(<App />)
  // Get a copy of store data to create the same store on client side
  // const preloadedState = store.getState()

  return {content}
}