import React from 'react'
import { useScrollRestoration } from '../../../Shared/useScrollRestoration'

const Homepage = () => {
  // Use the scroll restoration hook
  useScrollRestoration()

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  )
}

export default Homepage
