export function scrollToTop() {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  } catch(err) {
    if (err instanceof TypeError) {
      window.scroll(0, 0)
    } else {
      throw err
    }
  }
}

export function getScrollPercent() {
  const h = document.documentElement
  const b = document.body
  const st = "scrollTop"
  const sh = "scrollHeight"
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100
}
