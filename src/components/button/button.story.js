import React from "react"
import { storiesOf } from "@storybook/react"
import Button from "./index"

storiesOf("Button", module).add("Primary button", () => {
  return <Button primary>Yes</Button>
})

storiesOf("Button", module).add("Secondary button", () => {
  return <Button secondary>No</Button>
})