export function scrollToTop() {
  window.scroll(0, 0)
}

export function getScrollPercent() {
  const h = document.documentElement
  const b = document.body
  const st = "scrollTop"
  const sh = "scrollHeight"
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
}
