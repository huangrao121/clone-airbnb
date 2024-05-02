import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

export async function DELETE(req:Request, context: {params:{reservationId: string}}){
  const reservationId = context.params.reservationId

  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }
  if(!reservationId || typeof reservationId !== 'string'){
    throw new Error('invalid ID')
  }

  const reservation = await prisma.reservation.deleteMany({
    where:{
      id: reservationId,
      OR:[
        {userId: currentUser.id},
        {listing:{userId: currentUser.id}}
      ]
    }
  })

  return NextResponse.json(reservation)
}