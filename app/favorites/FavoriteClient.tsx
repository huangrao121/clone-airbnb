'use client'

import React, { useCallback } from 'react'
import axios from 'axios'
import { User, Listing } from '@prisma/client'
import toast from 'react-hot-toast'
import { useMemo, useEffect } from 'react'
import Container from '../components/Container'
import ListingCard from '../components/Listing/ListingCard'
import Heading from '../components/modals/Heading'

const FavoriteClient = ({
  currentUser,
  favorites
}:{currentUser:User,
  favorites:any[]
}) => {

  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have liked'
      />
      <div className='
        mt-10
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-8
      '>
        {favorites.map((favoriteList)=>(
          <ListingCard
            key={favoriteList.id}
            data={favoriteList}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoriteClient