import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
  req:Request,
  {params}:{params:{listingId: string}}
){
  const currentUser = await getCurrentUser()
  const listingId = params.listingId
  console.log(req.body)

  if(!currentUser){
    return NextResponse.error()
  }

  if(!listingId || typeof listingId !== 'string'){
    console.log(params)
    throw new Error('invalid listing id')
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)

  const user = await prisma?.user.update({
    where:{
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })
  return NextResponse.json(user)
}

export async function DELETE(
  req:Request,
  {params}:{params:{listingId: string}}
){
  const currentUser = await getCurrentUser()
  const listingId = params.listingId

  if(!currentUser){
    return NextResponse.error()
  }

  if(!listingId || typeof listingId !== 'string'){
    throw new Error('invalid listing id')
  }

  const favorites = [...(currentUser.favoriteIds || [])]
  if(!favorites.includes(listingId)){
    throw new Error('invalid listing id')
  }
  
  const updatedFavorites = favorites.filter((id: string)=> id !== listingId)
  console.log(updatedFavorites)
  const user = await prisma?.user.update({
    where:{
      id: currentUser.id
    },
    data:{
      favoriteIds:updatedFavorites
    }
  })

  return NextResponse.json(user)
}