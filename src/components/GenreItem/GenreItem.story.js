import React from "react"
import { storiesOf } from "@storybook/react"
import GenreItem from "./index"

storiesOf("GenreItem", module).add("Default", () => {
  return (
    <GenreItem />
  )
})