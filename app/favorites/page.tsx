
import React, { useEffect, useState } from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import FavoriteClient from './FavoriteClient'
import axios from 'axios'
import getFavorites from '../actions/getFavorites'
const FavoritePage = async ()=>{
  const currentUser = await getCurrentUser()
  const allFavorites = await getFavorites()

  if(!currentUser){
    return <EmptyState
      title="You haven't logged in"
      subtitle='Please log in to see your favorites list'
    />
  }

  if(currentUser.favoriteIds.length===0){
    return <EmptyState
      title="You haven't liked any property yet"
      subtitle='Click heart button to like'
    />
  }

  return (
    <FavoriteClient
      currentUser={currentUser}
      favorites={allFavorites}
    />
  )
}

export default FavoritePage