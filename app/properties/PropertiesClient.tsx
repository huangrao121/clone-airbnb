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


interface PropertiesClientProps{
  currentUser: User,
  properties: any[]
}

const PropertiesClient = ({
  currentUser,
  properties
}:PropertiesClientProps) => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState('')

  const onCancel = useCallback((id: string)=>{
    setDeleteId(id)
    axios.delete(`api/listing/${id}`)
    .then(()=>{
      toast.success('Delete listing successfully')
      router.refresh()
    })
    .catch((error)=>{toast.error(error.response.data.error)})
    .finally(()=>{setDeleteId('')})
  },[router])


  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="The properties you possess"
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
        {properties && (
          properties.map((property)=>
            (<ListingCard
              key={property.id}
              data={property}      
              actionId={property.id}
              onAction={onCancel}
              actionLabel={"Delete property"}
              currentUser={currentUser}
              disabled={deleteId === property.id}
            />)
          )
        )}
      </div>
    </Container>
  )
}

export default PropertiesClient