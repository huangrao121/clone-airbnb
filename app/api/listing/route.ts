import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(req: Request){
  const body = await req.json()
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imgSrc,
    price,
    title,
    description
  } = body
  
  Object.keys(body).forEach((value: any)=>{
    if(!body[value]){
      return NextResponse.error()
    }
  })  
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc:imgSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue:location.value,
      price: parseInt(price),
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)

}