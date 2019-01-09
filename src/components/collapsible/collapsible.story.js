import React from 'react'
import { storiesOf } from '@storybook/react'
import Collapsible from '.';

storiesOf('Collapsible', module).add('Without body', () => {
  return (
    <div style={{ width: '900px' }}>
      <Collapsible title="Customer Restrictions">

      </Collapsible>
    </div>
  )
})