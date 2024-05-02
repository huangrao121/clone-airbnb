import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
export async function POST(
  req:Request
){
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }

  const body = await req.json()
  const {totalPrice, startDate, endDate, listingId} = body
  
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }


  console.log("listingId is "+ listingId)
  const listingReservation = await prisma.listing.update({
    where:{
      id: listingId
    },
    data:{
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    },
    include:{
      reservations:true
    }
  })

  return NextResponse.json(listingReservation)

}