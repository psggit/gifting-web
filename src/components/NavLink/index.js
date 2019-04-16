import React from "react"

function NavLink({ href, children, history, extendedOnclick }) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault()
        const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
        history.push(path)
        if (extendedOnclick) {
          extendedOnclick()
        }
      }}
      href={href}>{children}
    </a>
  )
}

export default NavLink