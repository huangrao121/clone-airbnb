import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { NextResponse } from 'next/server'

export default async function getFavorites(){
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return []
  }


  const favorites = await prisma.listing.findMany({
    where:{id:{in: [...(currentUser.favoriteIds || [])]}}
  })
  

  return favorites
}