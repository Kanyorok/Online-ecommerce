import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
  return (
    <Helmet>
        <title>{`${title}- The Shoppers' Choice`}</title>
    </Helmet>
  )
}

export default MetaData