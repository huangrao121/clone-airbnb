import React from 'react'
import { User } from '@prisma/client'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import Container from '../components/Container'
import getListings from '../actions/getListings'
import TripClient from './PropertiesClient'

const Properties = async ()=>{
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return (
      <EmptyState
        title="You haven't logged in"
        subtitle='Please Login'
      />
    )
  }
  const properties = await getListings({userId: currentUser.id})

  if(properties.length === 0){
    return (
      <EmptyState
        title="You don't have any properties yet"
        subtitle='Please create one property'
      />
    )
  }
  return (
    <TripClient
      currentUser={currentUser}
      properties={properties}
    />
  )
}

export default Properties