import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import { getReservations } from '../actions/getReservations'
import TripClient from './TripClient'

const Trips = async ()=>{
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return (
      <EmptyState
        title="You haven't logged in"
        subtitle='Please Login'
      />
    )
  }
  const reservations = await getReservations({params:{userId: currentUser.id}})

  if(reservations.length === 0){
    return (
      <EmptyState
        title="You don't have any trips yet"
        subtitle='Please reserve'
      />
    )
  }
  return (
    <TripClient
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default Trips