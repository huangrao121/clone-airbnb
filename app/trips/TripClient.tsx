'use client'

import { User,Reservation } from '@prisma/client'
import { useCallback, useState } from 'react'
import React from 'react'
import Container from '../components/Container'
import Heading from '../components/modals/Heading'
import ListingCard from '../components/Listing/ListingCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'


interface TripClientProps{
  currentUser: User,
  reservations: any[]
}

const TripClient = ({
  currentUser,
  reservations
}:TripClientProps) => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState('')

  const onCancel = useCallback((id: string)=>{
    setDeleteId(id)
    axios.delete(`api/reservation/${id}`)
    .then(()=>{
      toast.success('Delete reservation successfully')
      router.refresh()
    })
    .catch((error)=>{toast.error(error.response.data.error)})
    .finally(()=>{setDeleteId('')})
  },[router])


  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and are going"
      />
      <div
        className='
          mt-10
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-6
        ' 
      >
        {reservations && (
          reservations.map((reservation)=>
            (<ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              actionLabel={"Cancel reservation"}
              currentUser={currentUser}
            />)
          )
        )}
      </div>
    </Container>
  )
}

export default TripClient